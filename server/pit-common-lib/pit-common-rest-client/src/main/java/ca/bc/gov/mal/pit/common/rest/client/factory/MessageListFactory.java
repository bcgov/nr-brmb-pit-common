package ca.bc.gov.mal.pit.common.rest.client.factory;

import ca.bc.gov.mal.pit.common.rest.resource.MessageListRsrc;
import ca.bc.gov.mal.pit.common.rest.resource.transformers.Transformer;

public interface MessageListFactory {

	MessageListRsrc getMessageList(Transformer transformer, byte[] body);

}
