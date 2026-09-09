package ca.bc.gov.mal.pit.common.service.api;

import java.util.ArrayList;
import java.util.List;

import ca.bc.gov.mal.pit.common.model.Message;

public class ValidationFailureException extends Exception {

	private static final long serialVersionUID = 1L;

	private List<Message> validationErrors = new ArrayList<>();
	
	public ValidationFailureException(List<Message> validationErrors) {
		super();
		
		this.validationErrors = validationErrors;
	}

	public List<Message> getValidationErrors() {
		return validationErrors;
	}

}
