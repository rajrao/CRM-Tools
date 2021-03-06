Type.registerNamespace("Mscrm");
Mscrm.LeadCommandActions = function () {};
Mscrm.LeadCommandActions.qualifyLeadQuick = function () {
	Mscrm.LeadCommandActions.qualifyLeadAs(-1)
};
Mscrm.LeadCommandActions.qualifyLeadAs = function (qualifyStatus) {
	if (Mscrm.InternalUtilities.JSTypes.isNull(Xrm.Page.data.entity.getId()))
		return;
	if (!Xrm.Page.data.getIsValid())
		return;
	Xrm.Page.context.saveMode = 16;
	if (Xrm.Utility.isMocaOffline())
		if (Xrm.Page.data.entity.getIsDirty())
			Xrm.Page.data.save().then(function () {
				Mscrm.LeadCommandActions.$7(qualifyStatus)
			}, function ($p1_0) {
				Xrm.Internal.openErrorDialog($p1_0.errorCode, Xrm.Internal.getErrorMessage($p1_0.errorCode))
			});
		else
			Mscrm.LeadCommandActions.$7(qualifyStatus);
	else
		Xrm.Page.data.save().then(function () {
			Mscrm.LeadCommandActions.$7(qualifyStatus)
		}, function ($p1_0) {
			Xrm.Internal.openErrorDialog($p1_0.errorCode, Xrm.Internal.getErrorMessage($p1_0.errorCode))
		});
	Xrm.Page.context.saveMode = -1
};
Mscrm.LeadCommandActions.disqualifyLeadQuick = function () {
	Mscrm.LeadCommandActions.disqualifyLeadAs(-1)
};
Mscrm.LeadCommandActions.disqualifyLeadAs = function (disqualifyStatus) {
	Xrm.Page.context.saveMode = 15;
	var $v_0 = 2;
	Mscrm.CommandBarActions.setState(Xrm.Page.data.entity.getId(), "lead", $v_0, disqualifyStatus);
	Xrm.Page.context.saveMode = -1
};
Mscrm.LeadCommandActions.performActionAfterHandleLeadDuplication = function (returnValue) {
	var $v_0 = returnValue.qualifyStatus,
	$v_1 = returnValue.transactionCurrencyId,
	$v_2 = returnValue.parentAccountId,
	$v_3 = returnValue.parentContactId,
	$v_4 = returnValue.parentAccountName,
	$v_5 = returnValue.parentContactName;
	Mscrm.LeadCommandActions.$9($v_0, $v_1, $v_2, $v_3, $v_4, $v_5)
};
Mscrm.LeadCommandActions.$9 = function ($p0, $p1, $p2, $p3, $p4, $p5) {
	Mscrm.LeadCommandActions.$2("parentaccountid", $p4, $p2, "account", false);
	Mscrm.LeadCommandActions.$2("parentcontactid", $p5, $p3, "contact", false);
	if (Xrm.Page.data.entity.getIsDirty())
		Xrm.Page.data.save().then(function () {
			Mscrm.InternalUtilities.DialogUtility.isMDDEnabled() && Xrm.Page.data.setFormDirty(false);
			Mscrm.LeadCommandActions.$0($p0, $p1, true)
		}, function ($p1_0) {
			Xrm.Internal.openErrorDialog($p1_0.errorCode, Xrm.Internal.getErrorMessage($p1_0.errorCode))
		});
	else
		Mscrm.LeadCommandActions.$0($p0, $p1, true)
};
Mscrm.LeadCommandActions.getTransactionCurrencyId = function (succeedCallback, errorCallback) {
	var $v_0 = Xrm.Page.getAttribute("transactioncurrencyid");
	if (!Mscrm.InternalUtilities.JSTypes.isNull($v_0)) {
		var $v_3 = $v_0.getValue();
		if (!Mscrm.InternalUtilities.JSTypes.isNull($v_3) && $v_3.length > 0) {
			succeedCallback($v_3[0].id);
			return
		}
	}
	if (Xrm.Utility.isMocaOffline()) {
		succeedCallback(null);
		return
	}
	var $v_1 = Xrm.Page.context.getUserId(),
	$v_2 = ["transactioncurrencyid", "organizationid"];
	Xrm.Internal.messages.retrieve("systemuser", $v_1, $v_2).then(function ($p1_0) {
		var $v_4 = $p1_0.entity;
		if ($v_4.hasValue("transactioncurrencyid"))
			succeedCallback($v_4.getValue("transactioncurrencyid").Id.toString());
		else {
			$v_1 = $v_4.getValue("organizationid").toString();
			$v_2 = ["basecurrencyid"];
			Xrm.Internal.messages.retrieve("organization", $v_1, $v_2).then(function ($p2_0) {
				var $v_5 = $p2_0.entity;
				succeedCallback($v_5.getValue("basecurrencyid").Id.toString())
			}, errorCallback)
		}
	}, errorCallback)
};
Mscrm.LeadCommandActions.$4 = function ($p0) {
	var $v_0 = Xrm.Page.getAttribute($p0);
	if (!Mscrm.InternalUtilities.JSTypes.isNull($v_0)) {
		var $v_1 = $v_0.getValue();
		if (!Mscrm.InternalUtilities.JSTypes.isNull($v_1) && $v_1.length > 0)
			return $v_1[0].name
	}
	return ""
};
Mscrm.LeadCommandActions.dupWarningOnLoadHandler = function () {
	var $v_0,
	$v_1;
	if (!Mscrm.InternalUtilities.JSTypes.isNull(Mscrm.InternalUtilities.DialogUtility.getAttributeValue("parentAccountId"))) {
		$v_0 = Mscrm.InternalUtilities.DialogUtility.getAttributeValue("parentAccountName").toString();
		$v_1 = Mscrm.InternalUtilities.DialogUtility.getAttributeValue("parentAccountId").toString();
		Mscrm.LeadCommandActions.$2("parentAccountLookup_id", $v_0, $v_1, "account", true)
	}
	if (!Mscrm.InternalUtilities.JSTypes.isNull(Mscrm.InternalUtilities.DialogUtility.getAttributeValue("parentContactId"))) {
		$v_0 = Mscrm.InternalUtilities.DialogUtility.getAttributeValue("parentContactName").toString();
		$v_1 = Mscrm.InternalUtilities.DialogUtility.getAttributeValue("parentContactId").toString();
		Mscrm.LeadCommandActions.$2("parentContactLookup_id", $v_0, $v_1, "contact", true)
	}
};
Mscrm.LeadCommandActions.dupWarningOnOkClickHandler = function () {
	Mscrm.InternalUtilities.DialogUtility.setAttributeValue("lastButtonClicked", "ok_id");
	var $v_0,
	$v_1 = Xrm.Page.data.entity.attributes.get("parentContactLookup_id");
	$v_0 = $v_1.getValue();
	Mscrm.InternalUtilities.DialogUtility.setAttributeValue("parentContactId", Mscrm.InternalUtilities.JSTypes.isNull($v_0) ? null : $v_0[0].id);
	Mscrm.InternalUtilities.DialogUtility.setAttributeValue("parentContactName", Mscrm.InternalUtilities.JSTypes.isNull($v_0) ? null : $v_0[0].name);
	var $v_2 = Xrm.Page.data.entity.attributes.get("parentAccountLookup_id");
	$v_0 = $v_2.getValue();
	Mscrm.InternalUtilities.DialogUtility.setAttributeValue("parentAccountId", Mscrm.InternalUtilities.JSTypes.isNull($v_0) ? null : $v_0[0].id);
	Mscrm.InternalUtilities.DialogUtility.setAttributeValue("parentAccountName", Mscrm.InternalUtilities.JSTypes.isNull($v_0) ? null : $v_0[0].name);
	Xrm.Page.ui.close()
};
Mscrm.LeadCommandActions.closeDupWarningDialogCallback = function (dialogParams, callbackParams) {
	if (!Mscrm.InternalUtilities.JSTypes.isNull(dialogParams) && dialogParams["lastButtonClicked"] === "ok_id") {
		var $v_0 = parseInt(callbackParams["qualifyStatus"].toString(), 10),
		$v_1 = callbackParams["transactioncurrencyid"].toString(),
		$v_2 = !Mscrm.InternalUtilities.JSTypes.isNull(dialogParams["parentAccountId"]) ? dialogParams["parentAccountId"].toString() : null,
		$v_3 = !Mscrm.InternalUtilities.JSTypes.isNull(dialogParams["parentContactId"]) ? dialogParams["parentContactId"].toString() : null,
		$v_4 = !Mscrm.InternalUtilities.JSTypes.isNull(dialogParams["parentAccountName"]) ? dialogParams["parentAccountName"].toString() : null,
		$v_5 = !Mscrm.InternalUtilities.JSTypes.isNull(dialogParams["parentContactName"]) ? dialogParams["parentContactName"].toString() : null;
		Mscrm.LeadCommandActions.$9($v_0, $v_1, $v_2, $v_3, $v_4, $v_5)
	}
};
Mscrm.LeadCommandActions.$0 = function ($p0, $p1, $p2) {
	var $v_0 = null,
	$v_1 = null,
	$v_2 = null,
	$v_3 = null,
	$v_4 = false,
	$v_5 = false,
	$v_6 = "",
	$v_7 = false,
	$v_8 = true,
	$v_9 = true,
	$v_A = Mscrm.LeadCommandActions.$5(Mscrm.LeadCommandActions.$6("campaignid")),
	$v_B = null,
	$v_C = Mscrm.LeadCommandActions.$6("parentaccountid");
	$v_0 = Mscrm.LeadCommandActions.$5($v_C);
	if (!Mscrm.InternalUtilities.JSTypes.isNullOrEmptyString($v_0)) {
		$v_5 = true;
		$v_2 = $v_C.name
	}
	var $v_D = Mscrm.LeadCommandActions.$6("parentcontactid");
	$v_1 = Mscrm.LeadCommandActions.$5($v_D);
	if (!Mscrm.InternalUtilities.JSTypes.isNullOrEmptyString($v_1)) {
		$v_4 = true;
		$v_3 = $v_D.name
	}
	var $v_E = Xrm.Page.getAttribute("companyname");
	if (!Mscrm.InternalUtilities.JSTypes.isNull($v_E)) {
		var $v_J = $v_E.getValue();
		if (!Mscrm.InternalUtilities.JSTypes.isNull($v_J))
			$v_6 = $v_J
	}
	if (!Mscrm.InternalUtilities.JSTypes.isNullOrEmptyString($v_6) || !$v_E.getUserPrivilege().canRead)
		$v_7 = true;
	if ($v_5 && $v_4) {
		$v_7 = false;
		$v_8 = false;
		$v_B = new Xrm.Objects.EntityReference("account", new Microsoft.Crm.Client.Core.Framework.Guid($v_0), Mscrm.LeadCommandActions.$4("parentAccountId"))
	} else if ($v_5) {
		$v_7 = false;
		$v_8 = true
	} else if ($v_4)
		if (!Mscrm.InternalUtilities.JSTypes.isNullOrEmptyString($v_6)) {
			$v_7 = true;
			$v_8 = false
		} else {
			$v_7 = false;
			$v_8 = false;
			$v_B = new Xrm.Objects.EntityReference("contact", new Microsoft.Crm.Client.Core.Framework.Guid($v_1), Mscrm.LeadCommandActions.$4("parentContactId"))
		}
	var $v_F = new Xrm.Objects.EntityReference("lead", new Microsoft.Crm.Client.Core.Framework.Guid(Xrm.Page.data.entity.getId())),
	$v_G = Mscrm.InternalUtilities._String.isNullOrWhiteSpace($p1) ? null : new Xrm.Objects.EntityReference("lead", new Microsoft.Crm.Client.Core.Framework.Guid($p1), Mscrm.LeadCommandActions.$4("transactioncurrencyid")),
	$v_H = Mscrm.InternalUtilities._String.isNullOrWhiteSpace($v_A) ? null : new Xrm.Objects.EntityReference("campaign", new Microsoft.Crm.Client.Core.Framework.Guid($v_A));
	if (Xrm.Utility.isMocaOffline() && Mscrm.InternalUtilities.JSTypes.isNull($v_G))
		$v_G = Xrm.Utility.getDefaultTransactionCurrency();
	var $v_I = function ($p1_0) {
		var $v_K = -2147220685;
		if ($p1_0.get_organizationServiceFault() && $p1_0.get_organizationServiceFault().get_errorCode() === $v_K)
			Mscrm.LeadCommandActions.$A($v_0, $v_1, $v_2, $v_3, $p0, $p1);
		else
			Mscrm.InternalUtilities.ClientApiUtility.actionFailedCallback($p1_0)
	};
	if (Xrm.Utility.isMocaOffline()) {
		var $v_L = null,
		$v_M = null,
		$v_N = null;
		try {
			$v_L = Xrm.Page.data.process.getActivePath();
			$v_M = $v_L.getByIndex(0);
			$v_N = $v_L.getByIndex(1)
		} catch ($$e_S) {}
		var $v_O = "",
		$v_P = "",
		$v_Q = "";
		if ($v_N && $v_N.getEntityName().toLowerCase() !== "opportunity".toLowerCase()) {
			$v_Q = "," + $v_N.getId();
			for (var $v_T = $v_L.getLength(), $v_U = 2; $v_U < $v_T; $v_U++) {
				var $v_V = $v_L.getByIndex($v_U);
				if (!Mscrm.InternalUtilities.JSTypes.isNull($v_V)) {
					$v_Q = $v_Q + "," + $v_V.getId();
					if ($v_V.getEntityName().toLowerCase() === "opportunity".toLowerCase()) {
						$v_N = $v_V;
						break
					}
				}
			}
		}
		if (!Mscrm.InternalUtilities.JSTypes.isNull($v_M) && !Mscrm.InternalUtilities.JSTypes.isNull($v_N)) {
			var $v_W = $v_M.getId();
			$v_O = $v_N.getId();
			if (!Mscrm.InternalUtilities.JSTypes.isNullOrEmptyString($v_Q))
				$v_P = $v_W + $v_Q;
			else
				$v_P = $v_W + "," + $v_O
		}
		$p0 = 3;
		$p2 = true;
		var $v_R = new Xrm.Gen.QualifyLeadRequest($v_F, $v_7, $v_8, $v_9, $v_G, $v_B, $v_H, $p0, $p2);
		$v_R.nextStageId = $v_O;
		$v_R.traversedPath = $v_P;
		var $v_S = function ($p1_0) {
			for (var $v_X = null, $v_Y = 0; $v_Y < $p1_0.get_Items().length; $v_Y++)
				if ($p1_0.get_Items()[$v_Y].get_entityType() === "opportunity") {
					$v_X = $p1_0.get_Items()[$v_Y].get_entity();
					break
				}
			if ($v_X) {
				var $v_Z = Xrm.Internal.getEntityCode(Xrm.Page.data.entity.getEntityName());
				Xrm.Internal.refreshParentGrid($v_Z, "", Xrm.Page.data.entity.getId());
				Xrm.Utility.openEntityForm("opportunity".toLowerCase(), $v_X["opportunityId".toLowerCase()].toString(), {})
			}
		};
		Xrm.Utility.executeNonCudCommand("QualifyLead", "lead", $v_R, $v_S, $v_I)
	} else
		Xrm.Internal.messages.qualifyLead($v_F, $v_7, $v_8, $v_9, $v_G, $v_B, $v_H, $p0, $p2).then(function ($p1_0) {
			for (var $v_a = $p1_0, $v_b = null, $v_c = 0; $v_c < $v_a.createdEntities.length; $v_c++)
				if ($v_a.createdEntities[$v_c].LogicalName === "opportunity") {
					$v_b = $v_a.createdEntities[$v_c];
					break
				}
			if (!Mscrm.InternalUtilities.JSTypes.isNull($v_b)) {
				var $v_d = Xrm.Internal.getEntityCode(Xrm.Page.data.entity.getEntityName());
				Xrm.Internal.refreshParentGrid($v_d, "", Xrm.Page.data.entity.getId());
				Xrm.Utility.openEntityForm($v_b.LogicalName, $v_b.Id.toString(), {})
			}
		}, $v_I)
};
Mscrm.LeadCommandActions.$A = function ($p0, $p1, $p2, $p3, $p4, $p5) {
	var $v_0 = new Xrm.DialogOptions;
	$v_0.width = 400;
	$v_0.height = 300;
	var $v_1 = {};
	$v_1["entityId"] = Xrm.Page.data.entity.getId();
	$v_1["parentAccountId"] = $p0;
	$v_1["parentAccountName"] = $p2;
	$v_1["parentContactId"] = $p1;
	$v_1["parentContactName"] = $p3;
	var $v_2 = {};
	$v_2["transactioncurrencyid"] = $p5;
	$v_2["qualifyStatus"] = $p4;
	Xrm.Dialog.openDialog("DupWarning", $v_0, $v_1, Mscrm.LeadCommandActions.closeDupWarningDialogCallback, $v_2)
};
Mscrm.LeadCommandActions.$7 = function ($p0) {
	Mscrm.LeadCommandActions.getTransactionCurrencyId(function ($p1_0) {
		Mscrm.LeadCommandActions.$0($p0, $p1_0, false)
	}, Mscrm.InternalUtilities.ClientApiUtility.actionFailedCallback)
};
Mscrm.LeadCommandActions.$6 = function ($p0) {
	var $v_0 = Xrm.Page.getAttribute($p0);
	if (!Mscrm.InternalUtilities.JSTypes.isNull($v_0)) {
		var $v_2 = $v_0.getValue();
		if (!Mscrm.InternalUtilities.JSTypes.isNull($v_2))
			return $v_2[0]
	}
	var $v_1 = new Xrm.LookupObject;
	return $v_1
};
Mscrm.LeadCommandActions.$5 = function ($p0) {
	var $v_0 = null;
	if (!Mscrm.InternalUtilities.JSTypes.isNull($p0))
		$v_0 = $p0.id;
	return $v_0
};
Mscrm.LeadCommandActions.$2 = function ($p0, $p1, $p2, $p3, $p4) {
	var $v_0 = Xrm.Page.getAttribute($p0);
	if (!Mscrm.InternalUtilities.JSTypes.isNull($v_0)) {
		if (!Mscrm.InternalUtilities.JSTypes.isNull($v_0.getValue())) {
			if ($v_0.getValue()[0].id === $p2)
				return
		} else if (Mscrm.InternalUtilities.JSTypes.isNullOrEmptyString($p2))
			return;
		var $v_1 = new Xrm.LookupObject;
		$v_1.entityType = $p3;
		$v_1.id = $p2;
		$v_1.name = $p1;
		var $v_2 = new Array(1);
		$v_2[0] = $v_1;
		$v_0.setValue($v_2);
		!$p4 && Xrm.Page.data.setFormDirty(true)
	}
};
Mscrm.LeadGridCommandActions = function () {};
Mscrm.LeadGridCommandActions.qualifyLeadQuick = function (gridControl, records, entityTypeCode) {
	Mscrm.LeadGridCommandActions.qualifyLeadAs(gridControl, records, entityTypeCode, -1)
};
Mscrm.LeadGridCommandActions.qualifyLeadAs = function (gridControl, records, entityTypeCode, statusCode) {
	if (Mscrm.InternalUtilities.DialogUtility.isMDDEnabled()) {
		if (Mscrm.InternalUtilities.DialogUtility.isMocaOffline() && !Xrm.Utility.isEntityOfflineSyncEnabled("lead")) {
			Mscrm.InternalUtilities.DialogUtility.showMoCAOfflineError();
			return
		}
		var $v_0 = 0;
		Mscrm.InternalUtilities.DialogUtility.showProgressMessage();
		var $v_1 = ["parentaccountid", "parentcontactid", "companyname", "campaignid", "transactioncurrencyid"];
		if (Xrm.Utility.isMocaOffline())
			for (var $$arr_6 = records, $$len_7 = $$arr_6.length, $$idx_8 = 0; $$idx_8 < $$len_7; ++$$idx_8) {
				var $v_2$9 = $$arr_6[$$idx_8],
				$v_3 = new Xrm.Objects.EntityReference("lead", new Microsoft.Crm.Client.Core.Framework.Guid($v_2$9.Id)),
				$v_4 = function ($p1_0) {
					$v_0++;
					Mscrm.LeadGridCommandActions.$0($p1_0, statusCode, $v_2$9, $v_0, gridControl, records)
				};
				Xrm.Utility.retrieveEntityRecord($v_3, $v_1, $v_4, Mscrm.InternalUtilities.DialogUtility.actionFailedCallbackForMoca)
			}
		else
			for (var $$arr_D = records, $$len_E = $$arr_D.length, $$idx_F = 0; $$idx_F < $$len_E; ++$$idx_F) {
				var $v_5 = $$arr_D[$$idx_F];
				Xrm.Internal.messages.retrieve("lead", $v_5.Id, $v_1).then(function ($p1_0) {
					$v_0++;
					var $v_6 = $p1_0.entity,
					$v_7 = new Mscrm.InternalUtilities.EntityReference;
					$v_7.Id = $v_6.getValue("leadid").toString();
					$v_7.LogicalName = "lead";
					Mscrm.LeadGridCommandActions.$0($v_6, statusCode, $v_7, $v_0, gridControl, records)
				}, Mscrm.InternalUtilities.DialogUtility.actionFailedCallbackForMoca)
			}
	} else
		Mscrm.LeadGridCommandActions.$8(gridControl, records, entityTypeCode, true, statusCode)
};
Mscrm.LeadGridCommandActions.$0 = function ($p0, $p1, $p2, $p3, $p4, $p5) {
	var $v_0 = false,
	$v_1 = true,
	$v_2 = true,
	$v_3 = new Xrm.Objects.EntityReference("lead", new Microsoft.Crm.Client.Core.Framework.Guid($p2.Id)),
	$v_4 = $p0.hasValue("transactioncurrencyid") ? $p0.getValue("transactioncurrencyid") : null,
	$v_5 = $p0.hasValue("campaignid") ? $p0.getValue("campaignid") : null,
	$v_6 = $p0.hasValue("parentaccountid") ? $p0.getValue("parentaccountid") : null,
	$v_7 = $p0.hasValue("parentcontactid") ? $p0.getValue("parentcontactid") : null,
	$v_8 = null,
	$v_9 = null;
	if (Xrm.Utility.isMocaOffline() && Mscrm.InternalUtilities.JSTypes.isNull($v_4))
		$v_4 = Xrm.Utility.getDefaultTransactionCurrency();
	if ($p0.hasValue("companyname") && $p0.getValue("companyname"))
		$v_9 = $p0.getValue("companyname").toString();
	if (!Mscrm.InternalUtilities.JSTypes.isNullOrEmptyString($v_9))
		$v_0 = true;
	if (!Mscrm.InternalUtilities.JSTypes.isNull($v_6) && !Mscrm.InternalUtilities.JSTypes.isNull($v_7)) {
		$v_0 = false;
		$v_1 = false;
		$v_8 = $v_6
	} else if (!Mscrm.InternalUtilities.JSTypes.isNull($v_6)) {
		$v_0 = false;
		$v_1 = true
	} else if (!Mscrm.InternalUtilities.JSTypes.isNull($v_7))
		if (!Mscrm.InternalUtilities.JSTypes.isNullOrEmptyString($v_9)) {
			$v_0 = true;
			$v_1 = false
		} else {
			$v_0 = false;
			$v_1 = false;
			$v_8 = $v_7
		}
	if (Xrm.Utility.isMocaOffline()) {
		var $v_A = null,
		$v_B = null,
		$v_C = null;
		if (!Mscrm.InternalUtilities.JSTypes.isNull(Xrm.Page.data)) {
			$v_A = Xrm.Page.data.process.getActivePath();
			$v_B = $v_A.getByIndex(0);
			$v_C = $v_A.getByIndex(1)
		}
		var $v_D = "",
		$v_E = "";
		if (!Mscrm.InternalUtilities.JSTypes.isNull($v_B) && !Mscrm.InternalUtilities.JSTypes.isNull($v_C)) {
			var $v_H = $v_B.getId();
			$v_D = $v_C.getId();
			$v_E = $v_H + "," + $v_D
		}
		$p1 = 3;
		//leadId v_3, createAccount v_0, createContact v_1, createOpportunity v_2, opportunityCurrencyId v_4, opportunityCustomerId v_8, sourceCampaignId v_5, status p1, suppressDuplicateDetection true, processInstanceId
		var $v_F = new Xrm.Gen.QualifyLeadRequest($v_3, $v_0, $v_1, $v_2, $v_4, $v_8, $v_5, $p1, true);
		$v_F.nextStageId = $v_D;
		$v_F.traversedPath = $v_E;
		var $v_G = function ($p1_0) {
			Mscrm.InternalUtilities.DialogUtility.hideProgressMessage();
			$p4.refresh()
		};
		Xrm.Utility.executeNonCudCommand("QualifyLead", "lead", $v_F, $v_G, Mscrm.InternalUtilities.DialogUtility.actionFailedCallbackForMoca)
	} else
		Xrm.Internal.messages.qualifyLead($v_3, $v_0, $v_1, $v_2, $v_4, $v_8, $v_5, $p1, true).then(function ($p1_0) {
			if ($p3 === $p5.length) {
				Mscrm.InternalUtilities.DialogUtility.hideProgressMessage();
				$p4.refresh()
			}
		}, Mscrm.InternalUtilities.DialogUtility.actionFailedCallbackForMoca)
};
Mscrm.LeadGridCommandActions.disqualifyLeadQuick = function (gridControl, records, entityTypeCode) {
	Mscrm.LeadGridCommandActions.disqualifyLeadAs(gridControl, records, entityTypeCode, -1)
};
Mscrm.LeadGridCommandActions.disqualifyLeadAs = function (gridControl, records, entityTypeCode, statusCode) {
	if (Mscrm.InternalUtilities.DialogUtility.isMDDEnabled()) {
		if (Mscrm.InternalUtilities.DialogUtility.isMocaOffline() && !Xrm.Utility.isEntityOfflineSyncEnabled("lead")) {
			Mscrm.InternalUtilities.DialogUtility.showMoCAOfflineError();
			return
		}
		var $v_0 = 0;
		Mscrm.InternalUtilities.DialogUtility.showProgressMessage();
		if (Xrm.Utility.isMocaOffline())
			for (var $$arr_5 = records, $$len_6 = $$arr_5.length, $$idx_7 = 0; $$idx_7 < $$len_6; ++$$idx_7) {
				var $v_1 = $$arr_5[$$idx_7],
				$v_2 = new Xrm.Objects.EntityReference("lead", new Microsoft.Crm.Client.Core.Framework.Guid($v_1.Id)),
				$v_3 = new Xrm.Gen.SetStateRequest($v_2, 2, statusCode, true),
				$v_4 = function () {
					$v_0++;
					if ($v_0 === records.length) {
						Mscrm.InternalUtilities.DialogUtility.hideProgressMessage();
						gridControl.refresh()
					}
				};
				Xrm.Utility.executeNonCudCommand("SetState", "lead", $v_3, $v_4, Mscrm.InternalUtilities.DialogUtility.actionFailedCallbackForMoca)
			}
		else
			for (var $$arr_C = records, $$len_D = $$arr_C.length, $$idx_E = 0; $$idx_E < $$len_D; ++$$idx_E) {
				var $v_5 = $$arr_C[$$idx_E];
				Xrm.Internal.messages.setState("lead", $v_5.Id, 2, statusCode).then(function ($p1_0) {
					$v_0++;
					if ($v_0 === records.length) {
						Mscrm.InternalUtilities.DialogUtility.hideProgressMessage();
						gridControl.refresh()
					}
				}, Mscrm.InternalUtilities.DialogUtility.actionFailedCallbackForMoca)
			}
	} else
		Mscrm.LeadGridCommandActions.$8(gridControl, records, entityTypeCode, false, statusCode)
};
Mscrm.LeadGridCommandActions.$8 = function ($p0, $p1, $p2, $p3, $p4) {
	var $v_0 = Mscrm.GlobalImported.CrmUri.create("/_grid/cmds/dlg_convertlead.aspx");
	$v_0.get_query()["iObjType"] = $p2;
	$v_0.get_query()["iTotal"] = $p1.length;
	$v_0.get_query()["qualify"] = $p3;
	$v_0.get_query()["qlShowNew"] = false;
	$v_0.get_query()["ulNewStatus"] = $p4;
	Mscrm.InternalUtilities.GridUtilities.executeStandardAction($v_0, $p1, 400, 200, Mscrm.GridCommandActions.createRefreshGridCallback($p0))
};
Mscrm.LeadMainSystemLibraryWebResource = function () {};
Mscrm.LeadMainSystemLibraryWebResource.formOnload = function () {
	Mscrm.LeadMainSystemLibraryWebResource.$D()
};
Mscrm.LeadMainSystemLibraryWebResource.form_OnSave = function () {
	window.setTimeout(function () {
		Mscrm.LeadMainSystemLibraryWebResource.$C()
	}, 10)
};
Mscrm.LeadMainSystemLibraryWebResource.$D = function () {
	var $v_0 = Xrm.Page.getAttribute("parentcontactid");
	if (!Mscrm.InternalUtilities.JSTypes.isNull($v_0)) {
		Mscrm.LeadMainSystemLibraryWebResource.$3 = function ($p1_0) {
			Mscrm.LeadMainSystemLibraryWebResource.$B()
		};
		$v_0.addOnChange(Mscrm.LeadMainSystemLibraryWebResource.$3)
	}
};
Mscrm.LeadMainSystemLibraryWebResource.$B = function () {
	Mscrm.LeadMainSystemLibraryWebResource.$1 = true
};
Mscrm.LeadMainSystemLibraryWebResource.$C = function () {
	var $v_0 = Xrm.Page.getControl("Stakeholders");
	if (!Mscrm.InternalUtilities.JSTypes.isNull($v_0) && Mscrm.LeadMainSystemLibraryWebResource.$1) {
		Mscrm.LeadMainSystemLibraryWebResource.$1 = false;
		$v_0.refresh()
	}
};
Mscrm.LeadCommandActions.registerClass("Mscrm.LeadCommandActions");
Mscrm.LeadGridCommandActions.registerClass("Mscrm.LeadGridCommandActions");
Mscrm.LeadMainSystemLibraryWebResource.registerClass("Mscrm.LeadMainSystemLibraryWebResource");
Mscrm.LeadMainSystemLibraryWebResource.$3 = null;
Mscrm.LeadMainSystemLibraryWebResource.$1 = false
