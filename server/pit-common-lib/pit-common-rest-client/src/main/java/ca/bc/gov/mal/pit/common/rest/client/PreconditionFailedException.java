package ca.bc.gov.mal.pit.common.rest.client;

public class PreconditionFailedException extends ClientErrorException {

	private static final long serialVersionUID = 1L;

	public PreconditionFailedException(String message) {
		super(412, message);
	}

}
