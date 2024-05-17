package com.pweb.eventhorizon.service;

import com.luciad.imageio.webp.WebPWriteParam;
import com.pweb.eventhorizon.exception.exceptions.ImageUploadException;
import com.pweb.eventhorizon.model.dto.EventImageDto;
import com.pweb.eventhorizon.model.entity.Event;
import com.pweb.eventhorizon.model.entity.EventImage;
import com.pweb.eventhorizon.repository.EventImageRepository;
import com.pweb.eventhorizon.repository.EventRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriter;
import javax.imageio.stream.ImageOutputStream;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Date;
import java.util.List;

import static javax.imageio.ImageWriteParam.MODE_EXPLICIT;

@Service
@RequiredArgsConstructor
public class EventImageService {

    public static final String COMPRESSION_TYPE = "Lossy";
    private final EventRepository eventRepository;
    private final EventImageRepository eventImageRepository;
    private final ModelMapper modelMapper;

    public static final float IMAGE_COMPRESSION_QUALITY = 0.0f;

    public EventImage uploadEventImage(String eventId, MultipartFile file) {
        Event event = eventRepository.findById(eventId).orElseThrow(EntityNotFoundException::new);

        EventImage eventImage = saveEventImage(event, file);
        event.getImages().add(eventImage);
        eventRepository.save(event);

        return eventImage;
    }

    public void uploadEventImages(Event event, List<MultipartFile> files) {
        for (MultipartFile file : files) {
            EventImage eventImage = saveEventImage(event, file);
            event.getImages().add(eventImage);
        }
        eventRepository.save(event);
    }

    @Transactional(readOnly = true)
    public List<EventImageDto> getEventImages(String eventId) {
        List<EventImage> eventImages = eventImageRepository.findByEventId(eventId);
        return eventImages.stream()
                .map(image -> modelMapper.map(image, EventImageDto.class))
                .toList();
    }

    private EventImage saveEventImage(Event event, MultipartFile file) {
        try {
            EventImage eventImage = EventImage.builder()
                    .fileName(file.getOriginalFilename())
                    .event(event)
                    .imageData(convertToWebP(file.getBytes(), IMAGE_COMPRESSION_QUALITY, COMPRESSION_TYPE))
                    .uploadDate(new Date())
                    .build();
            return eventImageRepository.save(eventImage);

        } catch (IOException e) {
            throw new ImageUploadException(e);
        }
    }

    public byte[] convertToWebP(byte[] imageData, float quality, String compressionType) throws IOException {
        BufferedImage image = ImageIO.read(new ByteArrayInputStream(imageData));
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        // Obtain a WebP ImageWriter instance
        ImageWriter writer = ImageIO.getImageWritersByMIMEType("image/webp").next();

        // Create an ImageOutputStream that can be used to write data to ByteArrayOutputStream
        try (ImageOutputStream imageOutputStream = ImageIO.createImageOutputStream(outputStream)) {
            writer.setOutput(imageOutputStream);

            // Prepare write parameters
            WebPWriteParam writeParam = new WebPWriteParam(writer.getLocale());
            writeParam.setCompressionMode(MODE_EXPLICIT);
            writeParam.setCompressionType(compressionType);
            writeParam.setCompressionQuality(quality);

            // Write the image to the ByteArrayOutputStream via the ImageOutputStream
            writer.write(null, new IIOImage(image, null, null), writeParam);

            writer.dispose();
        }

        // Convert the ByteArrayOutputStream to byte array
        return outputStream.toByteArray();
    }
}
