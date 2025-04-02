
package dreamjournal;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


/**
 * Configures Cross-Origin Resource Sharing (CORS) for the application.
 * This configuration ensures that the frontend can make requests
 * to the backend without encountering CORS issues.
 */

@Configuration
public class WebConfig {

    @Value("${frontend.url}")
    private String frontendUrl;

    public WebMvcConfigurer webConfig(){
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                WebMvcConfigurer.super.addCorsMappings(registry);
                registry.addMapping("/**")
                        .allowedOrigins("*")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*");
            }
        };
    }
}