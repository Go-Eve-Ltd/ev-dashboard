import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { CentralServerService } from '../../../../services/central-server.service';
import { DialogService } from '../../../../services/dialog.service';
import { MessageService } from '../../../../services/message.service';
import { SpinnerService } from '../../../../services/spinner.service';
import { ChargingStationTemplate, ChargingStationTemplateButtonAction } from '../../../../types/ChargingStationTemplate';
import { TableActionDef } from '../../../../types/Table';
import { TableDeleteAction } from '../table-delete-action';

export interface TableDeleteTemplateActionDef extends TableActionDef {
  action: (template: ChargingStationTemplate, dialogService: DialogService, translateService: TranslateService, messageService: MessageService,
    centralServerService: CentralServerService, spinnerService: SpinnerService, router: Router, refresh?: () => Observable<void>) => void;
}

export class TableDeleteTemplateAction extends TableDeleteAction {
  public getActionDef(): TableDeleteTemplateActionDef {
    return {
      ...super.getActionDef(),
      id: ChargingStationTemplateButtonAction.DELETE_TEMPLATE,
      action: this.deleteTemplate,
    };
  }

  private deleteTemplate(template: ChargingStationTemplate, dialogService: DialogService, translateService: TranslateService, messageService: MessageService,
    centralServerService: CentralServerService, spinnerService: SpinnerService, router: Router, refresh?: () => Observable<void>) {
    super.delete(
      template, 'templates.delete_title',
      translateService.instant('templates.delete_confirm', { templateID: template.id }),
      translateService.instant('templates.delete_success', { templateID: template.id }),
      // TODO: @melvyn add delete chargingStationTemplate to centralServerService
      'templates.delete_error', centralServerService.deleteSite.bind(centralServerService),
      dialogService, translateService, messageService, centralServerService, spinnerService, router, refresh);
  }
}
