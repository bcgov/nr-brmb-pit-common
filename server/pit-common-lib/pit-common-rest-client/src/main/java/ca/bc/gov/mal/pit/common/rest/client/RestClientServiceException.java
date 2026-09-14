package ca.bc.gov.mal.pit.common.rest.client;

public class RestClientServiceException extends Exception {

	private static final long serialVersionUID = 1L;
	
	public RestClientServiceException(String message) {
		super(message);
	}

	public RestClientServiceException(Throwable cause) {
		super(cause);
	}

	public RestClientServiceException(String message, Throwable cause) {
		super(message, cause);
	}

}
