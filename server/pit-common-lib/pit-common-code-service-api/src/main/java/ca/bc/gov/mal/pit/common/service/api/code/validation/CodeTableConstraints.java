package ca.bc.gov.mal.pit.common.service.api.code.validation;

import ca.bc.gov.mal.pit.common.model.Code;
import ca.bc.gov.mal.pit.common.model.CodeTable;
import jakarta.validation.constraints.NotBlank;

public interface CodeTableConstraints extends CodeTable<Code> {
	
	@Override
	@NotBlank(message=Errors.CODE_TABLE_NAME_NOTBLANK, groups=CodeTableConstraints.class)
	public String getCodeTableName();

}
