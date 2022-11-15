package pl.manes.onehundredideas.common.configuration;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "onehundredideas")
@Data
public class OneHundredIdeasConfiguration {

    private String name;

    @Value("${paging.pageSize:2}")
    private int pagingPageSize;

}
