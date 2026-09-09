package ca.bc.gov.mal.pit.common.checkhealth;

import ca.bc.gov.mal.pit.common.model.ValidationStatus;
import ca.bc.gov.mal.pit.common.rest.resource.HealthCheckResponseRsrc;

public interface CheckHealthValidator {

	void init();

	HealthCheckResponseRsrc validate(final String callstack);	
	
	String getComponentIdentifier();

	String getComponentName();

	ValidationStatus getRedMapping();
	void setRedMapping(ValidationStatus redMapping);

	ValidationStatus getYellowMapping();
	void setYellowMapping(ValidationStatus yellowMapping);

	ValidationStatus getGreenMapping();
	void setGreenMapping(ValidationStatus greenMapping);

}
