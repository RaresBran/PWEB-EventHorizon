package com.pweb.eventhorizon.config;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import com.pweb.eventhorizon.model.City;

@Component
public class StringToEnumConverter implements Converter<String, City> {
    @Override
    public City convert(String source) {
        return City.valueOf(source.toUpperCase());
    }
}

