package nl.fontys.withdrive.dto.alert;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class Greeting {

        private String content;

        public String getContent() {
                return content;
        }
}