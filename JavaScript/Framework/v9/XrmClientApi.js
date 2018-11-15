//represents the Xrm.WebApi functions from the main file
Xrm.WebApi = function() {}
Xrm.WebApi.getInstance = function() {
    if (Mscrm.InternalUtilities.JSTypes.isNull(Xrm.WebApi.$N)) {
        Xrm.WebApi.$N = new Xrm.WebApi();
    }
    return Xrm.WebApi.$N;
}
Xrm.WebApi.$B = function() {
    return Xrm.WebApi.getOnlineInstance();
}
Xrm.WebApi.getOnlineInstance = function() {
    return Xrm.WebApi.online;
}
Xrm.WebApi.getOfflineInstance = function() {
    return Xrm.WebApi.offline;
}
Xrm.WebApi.retrieveRecord = function(entityName, entityId, options) {
    return Xrm.WebApi.$B().retrieveRecord(entityName, entityId, options);
}
Xrm.WebApi.createRecord = function(entityType, data) {
    return Xrm.WebApi.$B().createRecord(entityType, data);
}
Xrm.WebApi.updateRecord = function(entityType, entityId, data) {
    return Xrm.WebApi.$B().updateRecord(entityType, entityId, data);
}
Xrm.WebApi.deleteRecord = function(entityType, entityId) {
    return Xrm.WebApi.$B().deleteRecord(entityType, entityId);
}
Xrm.WebApi.retrieveMultipleRecords = function(entityType, options, maxPageSize) {
    return Xrm.WebApi.$B().retrieveMultipleRecords(entityType, options, maxPageSize);
}
Xrm.WebApi.execute = function(request) {
    return Xrm.WebApi.$B().execute(request);
}
Xrm.WebApi.executeMultiple = function(requests) {
    return Xrm.WebApi.$B().executeMultiple(requests);
}

Type.registerNamespace('XrmClientApi');

XrmClientApi.CrudSdk = function() {}
XrmClientApi.CrudSdk.registerInterface('XrmClientApi.CrudSdk');

XrmClientApi.ErrorResponse = function(errorCode, message, debugMessage, innerError) {
    XrmClientApi.ErrorResponse.initializeBase(this, [errorCode, message, debugMessage, innerError]);
    this.innerror = innerError;
}
XrmClientApi.ErrorResponse.prototype = {
    innerror: null
}

XrmClientApi.OnlineSdk = function() {}
XrmClientApi.OnlineSdk.prototype = {

    retrieveRecord: function(entityName, entityId, options) {
        XrmClientApi.WebApi.Util.checkParameters([entityName, entityId], ['entityName', 'entityId']);
        Mscrm.InternalUtilities.ClientApiUtility.addTelemetryLog('Xrm.WebApi.online.retrieveRecord');
        var $v_0 = jQueryApi.jQueryDeferredFactory.Deferred(Object, Xrm.ErrorResponse);
        try {
            var $v_1 = XrmClientApi.WebApi.WebApiParser.getCollectionName(entityName) + '(' + XrmClientApi.WebApi.WebApiParser.trimEntityId(entityId) + ')';
            $v_1 += XrmClientApi.WebApi.WebApiParser.trimOptions(options);
            $v_1 = XrmClientApi.WebApi.WebApiParser.trimUrl($v_1);
            var $v_2 = {};
            $v_2['prefer'] = 'odata.include-annotations=\"*\"';
            $v_2['MSCRM.ReturnNotifications'] = 'true';
            var $v_3 = [200];
            var $v_4 = XrmClientApi.WebApi.WebApiService.getHTTPRequest(Object, Xrm.ErrorResponse, 'GET', $v_1, 0, entityName, $v_3, $v_0, $v_2);
            $v_4.send(null);
            return $v_0.promise();
        } catch ($v_5) {
            Mscrm.InternalUtilities.ClientApiUtility.addTelemetryLogForErrors('Xrm.WebApi.online.retrieveRecord', $v_5);
            $v_0.reject(new Xrm.ErrorResponse(0,$v_5.message,$v_5.stack,null));
            return $v_0.promise();
        }
    },

    createRecord: function(entityType, data) {
        XrmClientApi.WebApi.Util.checkParameters([entityType, data], ['entityType', 'data']);
        Mscrm.InternalUtilities.ClientApiUtility.addTelemetryLog('Xrm.WebApi.online.createRecord');
        var $v_0 = jQueryApi.jQueryDeferredFactory.Deferred(XrmClientApi.WebApi.EntityReference, Xrm.ErrorResponse);
        try {
            var $v_1 = XrmClientApi.WebApi.WebApiParser.getCollectionName(entityType);
            $v_1 = XrmClientApi.WebApi.WebApiParser.trimUrl($v_1);
            var $v_2 = [201, 204];
            var $v_3 = XrmClientApi.WebApi.WebApiService.getHTTPRequest(XrmClientApi.WebApi.EntityReference, Xrm.ErrorResponse, 'POST', $v_1, 2, entityType, $v_2, $v_0, null);
            $v_3.send(JSON.stringify(data));
            return $v_0.promise();
        } catch ($v_4) {
            Mscrm.InternalUtilities.ClientApiUtility.addTelemetryLogForErrors('Xrm.WebApi.online.createRecord', $v_4);
            $v_0.reject(new Xrm.ErrorResponse(0,$v_4.message,$v_4.stack,null));
            return $v_0.promise();
        }
    },

    updateRecord: function(entityType, entityId, data) {
        XrmClientApi.WebApi.Util.checkParameters([entityType, entityId, data], ['entityType', 'entityId', 'data']);
        Mscrm.InternalUtilities.ClientApiUtility.addTelemetryLog('Xrm.webApi.online.updateRecord');
        var $v_0 = jQueryApi.jQueryDeferredFactory.Deferred(XrmClientApi.WebApi.EntityReference, Xrm.ErrorResponse);
        try {
            var $v_1 = XrmClientApi.WebApi.WebApiParser.getCollectionName(entityType) + '(' + XrmClientApi.WebApi.WebApiParser.trimEntityId(entityId) + ')';
            $v_1 = XrmClientApi.WebApi.WebApiParser.trimUrl($v_1);
            var $v_2 = [204, 1223];
            var $v_3 = {};
            $v_3['X-HTTP-Method'] = 'MERGE';
            var $v_4 = XrmClientApi.WebApi.WebApiService.getHTTPRequest(XrmClientApi.WebApi.EntityReference, Xrm.ErrorResponse, 'PATCH', $v_1, 3, entityType, $v_2, $v_0, $v_3);
            $v_4.send(JSON.stringify(data));
            return $v_0.promise();
        } catch ($v_5) {
            Mscrm.InternalUtilities.ClientApiUtility.addTelemetryLogForErrors('Xrm.webApi.online.updateRecord', $v_5);
            $v_0.reject(new Xrm.ErrorResponse(0,$v_5.message,$v_5.stack,null));
            return $v_0.promise();
        }
    },

    deleteRecord: function(entityType, entityId) {
        XrmClientApi.WebApi.Util.checkParameters([entityType, entityId], ['entityType', 'entityId']);
        Mscrm.InternalUtilities.ClientApiUtility.addTelemetryLog('Xrm.WebApi.online.deleteRecord');
        var $v_0 = jQueryApi.jQueryDeferredFactory.Deferred(XrmClientApi.WebApi.EntityReference, Xrm.ErrorResponse);
        try {
            var $v_1 = XrmClientApi.WebApi.WebApiParser.getCollectionName(entityType) + '(' + XrmClientApi.WebApi.WebApiParser.trimEntityId(entityId) + ')';
            $v_1 = XrmClientApi.WebApi.WebApiParser.trimUrl($v_1);
            var $v_2 = [204, 1223];
            var $v_3 = {};
            $v_3['X-HTTP-Method'] = 'DELETE';
            var $v_4 = XrmClientApi.WebApi.WebApiService.getHTTPRequest(XrmClientApi.WebApi.EntityReference, Xrm.ErrorResponse, 'DELETE', $v_1, 4, entityType, $v_2, $v_0, $v_3);
            $v_4.send(null);
            return $v_0.promise();
        } catch ($v_5) {
            Mscrm.InternalUtilities.ClientApiUtility.addTelemetryLogForErrors('Xrm.WebApi.online.deleteRecord', $v_5);
            $v_0.reject(new Xrm.ErrorResponse(0,$v_5.message,$v_5.stack,null));
            return $v_0.promise();
        }
    },

    retrieveMultipleRecords: function(entityType, options, maxPageSize) {
        XrmClientApi.WebApi.Util.checkParameters([entityType], ['entityType']);
        Mscrm.InternalUtilities.ClientApiUtility.addTelemetryLog('Xrm.WebApi.online.retrieveMultipleRecords');
        var $v_0 = jQueryApi.jQueryDeferredFactory.Deferred(XrmClientApi.WebApi.RetrieveMultipleResponse, Xrm.ErrorResponse);
        try {
            var $v_1 = XrmClientApi.WebApi.WebApiParser.getCollectionName(entityType);
            $v_1 += XrmClientApi.WebApi.WebApiParser.trimOptions(options);
            $v_1 = XrmClientApi.WebApi.WebApiParser.trimUrl($v_1);
            var $v_2 = [200];
            var $v_3 = {};
            $v_3['MSCRM.ReturnNotifications'] = 'true';
            $v_3['prefer'] = 'odata.include-annotations=\"*\"';
            if (!Mscrm.InternalUtilities.JSTypes.isNull(maxPageSize)) {
                $v_3['prefer'] += ',' + String.format('odata.maxpagesize={0}', parseInt(maxPageSize));
            }
            var $v_4 = XrmClientApi.WebApi.WebApiService.getHTTPRequest(XrmClientApi.WebApi.RetrieveMultipleResponse, Xrm.ErrorResponse, 'GET', $v_1, 1, entityType, $v_2, $v_0, $v_3);
            $v_4.send(null);
            return $v_0.promise();
        } catch ($v_5) {
            Mscrm.InternalUtilities.ClientApiUtility.addTelemetryLogForErrors('Xrm.WebApi.online.retrieveMultipleRecords', $v_5);
            $v_0.reject(new Xrm.ErrorResponse(0,$v_5.message,$v_5.stack,null));
            return $v_0.promise();
        }
    },

    execute: function(request) {
        XrmClientApi.WebApi.Util.checkParameters([request], ['request']);
        Mscrm.InternalUtilities.ClientApiUtility.addTelemetryLog('Xrm.WebApi.online.execute');
        var $v_0 = jQueryApi.jQueryDeferredFactory.Deferred(Object, Xrm.ErrorResponse);
        try {
            var $v_1 = XrmClientApi.WebApi.ODataRequestBuilder.buildRequest(request);
            XrmClientApi.WebApi.WebApiService.sendSerializedRequest(Object, Xrm.ErrorResponse, $v_1, 5, $v_0);
            return $v_0.promise();
        } catch ($v_2) {
            Mscrm.InternalUtilities.ClientApiUtility.addTelemetryLogForErrors('Xrm.WebApi.online.execute', $v_2);
            $v_0.reject(new Xrm.ErrorResponse(0,$v_2.message,$v_2.stack,null));
            return $v_0.promise();
        }
    },

    executeMultiple: function(requests) {
        XrmClientApi.WebApi.Util.checkParameters([requests], ['requests']);
        Mscrm.InternalUtilities.ClientApiUtility.addTelemetryLog('Xrm.WebApi.online.executeMultiple');
        var $v_0 = jQueryApi.jQueryDeferredFactory.Deferred(Array, Xrm.ErrorResponse);
        try {
            var $v_1 = new Array(0);
            for (var $v_3 = 0; $v_3 < requests.length; $v_3++) {
                if (this.$17_0(requests[$v_3])) {
                    $v_1[$v_3] = XrmClientApi.WebApi.ODataRequestBuilder.buildRequest(requests[$v_3]);
                } else if (this.$16_0(requests[$v_3])) {
                    var $v_4 = new Array(0);
                    var $v_5 = requests[$v_3];
                    for (var $v_6 = 0; $v_6 < $v_5.length; $v_6++) {
                        $v_4[$v_6] = XrmClientApi.WebApi.ODataRequestBuilder.buildRequest($v_5[$v_6]);
                    }
                    $v_1[$v_3] = $v_4;
                }
            }
            var $v_2 = XrmClientApi.WebApi.ODataRequestBuilder.buildBatchRequest($v_1);
            XrmClientApi.WebApi.WebApiService.sendSerializedRequest(Array, Xrm.ErrorResponse, $v_2, 6, $v_0);
            return $v_0.promise();
        } catch ($v_7) {
            Mscrm.InternalUtilities.ClientApiUtility.addTelemetryLogForErrors('Xrm.WebApi.online.executeMultiple', $v_7);
            $v_0.reject(new Xrm.ErrorResponse(0,$v_7.message,$v_7.stack,null));
            return $v_0.promise();
        }
    },

    $17_0: function($p0) {
        return !Mscrm.InternalUtilities.JSTypes.isNull($p0) && !Mscrm.InternalUtilities.JSTypes.isArray($p0) && !Mscrm.InternalUtilities.JSTypes.isNull(($p0).getMetadata());
    },

    $16_0: function($p0) {
        var $v_0 = $p0;
        return !Mscrm.InternalUtilities.JSTypes.isNull($v_0) && Mscrm.InternalUtilities.JSTypes.isArray($v_0) && $v_0.length > 0 && !Mscrm.InternalUtilities.JSTypes.isNull($v_0[0].getMetadata());
    }
}

XrmClientApi.OfflineSdk = function() {}
XrmClientApi.OfflineSdk.prototype = {

    retrieveRecord: function(entityName, entityId, options) {
        Mscrm.InternalUtilities.ClientApiUtility.addTelemetryLog('Xrm.WebApi.offline.retrieveRecord');
        throw Error.notImplemented();
    },

    createRecord: function(entityType, data) {
        Mscrm.InternalUtilities.ClientApiUtility.addTelemetryLog('Xrm.WebApi.offline.createRecord');
        throw Error.notImplemented();
    },

    updateRecord: function(entityType, entityId, data) {
        Mscrm.InternalUtilities.ClientApiUtility.addTelemetryLog('Xrm.webApi.offline.updateRecord');
        throw Error.notImplemented();
    },

    deleteRecord: function(entityType, entityId) {
        Mscrm.InternalUtilities.ClientApiUtility.addTelemetryLog('Xrm.WebApi.offline.deleteRecord');
        throw Error.notImplemented();
    },

    retrieveMultipleRecords: function(entityType, options, maxPageSize) {
        Mscrm.InternalUtilities.ClientApiUtility.addTelemetryLog('Xrm.WebApi.offline.retrieveMultipleRecords');
        throw Error.notImplemented();
    },

    execute: function(request) {
        Mscrm.InternalUtilities.ClientApiUtility.addTelemetryLog('Xrm.WebApi.offline.execute');
        throw Error.notImplemented();
    },

    executeMultiple: function(requests) {
        Mscrm.InternalUtilities.ClientApiUtility.addTelemetryLog('Xrm.WebApi.offline.executeMultiple');
        throw Error.notImplemented();
    },

    isAvailableOffline: function(entityName) {
        return false;
    }
}

XrmClientApi.DialogResponse = function() {
    this.parameters = {};
}

XrmClientApi.ConfirmDialogResponse = function() {}
XrmClientApi.ConfirmDialogResponse.prototype = {
    confirmed: true
}

XrmClientApi.XrmAttributeMetadata = function() {}
XrmClientApi.XrmAttributeMetadata.prototype = {
    logicalName: null,
    displayName: null,
    attributeType: 0,
    entityLogicalName: null,

    getKey: function() {
        return this.logicalName;
    }
}

XrmClientApi.XrmEnumAttributeMetadata = function() {
    XrmClientApi.XrmEnumAttributeMetadata.initializeBase(this);
}
XrmClientApi.XrmEnumAttributeMetadata.prototype = {
    defaultFormValue: 0,
    options: null,
    optionSet: null
}

XrmClientApi.XrmStateAttributeMetadata = function() {
    XrmClientApi.XrmStateAttributeMetadata.initializeBase(this);
}

XrmClientApi.XrmStatusAttributeMetadata = function() {
    XrmClientApi.XrmStatusAttributeMetadata.initializeBase(this);
}

Type.registerNamespace('XrmClientApi.WebApi');

XrmClientApi.WebApi.ODataStructuralProperty = function() {}
XrmClientApi.WebApi.ODataStructuralProperty.prototype = {
    unknown: 0,
    primitiveType: 1,
    complexType: 2,
    enumerationType: 3,
    collection: 4,
    entityType: 5
}
XrmClientApi.WebApi.ODataStructuralProperty.registerEnum('XrmClientApi.WebApi.ODataStructuralProperty', false);

XrmClientApi.WebApi.Constants = function() {}

XrmClientApi.WebApi.Constants.ODataOperationType = function() {}
XrmClientApi.WebApi.Constants.ODataOperationType.prototype = {
    action: 0,
    func: 1,
    CRUD: 2
}
XrmClientApi.WebApi.Constants.ODataOperationType.registerEnum('XrmClientApi.WebApi.Constants.ODataOperationType', false);

XrmClientApi.WebApi.Constants.APIOperation = function() {}
XrmClientApi.WebApi.Constants.APIOperation.prototype = {
    retrieveRecord: 0,
    retrieveMultipleRecords: 1,
    createRecord: 2,
    updateRecord: 3,
    deleteRecord: 4,
    execute: 5,
    executeMultiple: 6
}
XrmClientApi.WebApi.Constants.APIOperation.registerEnum('XrmClientApi.WebApi.Constants.APIOperation', false);

XrmClientApi.WebApi.Constants.HttpStatusCode = function() {}
XrmClientApi.WebApi.Constants.HttpStatusCode.prototype = {
    OK: 200,
    created: 201,
    accepted: 202,
    nonAuthoritativeInformation: 203,
    noContent: 204,
    resetContent: 205,
    partialContent: 206,
    multiStatus: 207,
    alreadyReported: 208,
    imUsed: 226,
    noContentIE: 1223
}
XrmClientApi.WebApi.Constants.HttpStatusCode.registerEnum('XrmClientApi.WebApi.Constants.HttpStatusCode', false);

XrmClientApi.WebApi.Constants.ParticipationTypeMask = function() {}
XrmClientApi.WebApi.Constants.ParticipationTypeMask.prototype = {
    sender: 1,
    toRecipient: 2,
    ccRecipient: 3,
    bccRecipient: 4,
    requiredAttendee: 5,
    optionalAttendee: 6,
    organizer: 7,
    regarding: 8,
    owner: 9,
    resource: 10,
    customer: 11,
    INVALID: 12
}
XrmClientApi.WebApi.Constants.ParticipationTypeMask.registerEnum('XrmClientApi.WebApi.Constants.ParticipationTypeMask', false);

XrmClientApi.WebApi.EntityReference = function(id, entityType) {
    this.id = id;
    this.entityType = entityType;
}
XrmClientApi.WebApi.EntityReference.createEntityRefObj = function(entityRefObj) {
    var $v_0 = entityRefObj;
    var $v_1 = null;
    if (entityRefObj) {
        $v_1 = new XrmClientApi.WebApi.EntityReference($v_0['id'],$v_0['etn']);
    }
    return $v_1;
}
XrmClientApi.WebApi.EntityReference.prototype = {
    id: null,
    entityType: null
}

XrmClientApi.WebApi.EntityMetadataCache = function() {}
XrmClientApi.WebApi.EntityMetadataCache.$12 = function() {
    var $v_0 = Math.abs(window.VERSION_STAMP);
    if (!$v_0) {
        $v_0 = Math.floor(Math.random() * 10000);
    }
    return $v_0.toString();
}
XrmClientApi.WebApi.EntityMetadataCache.$d = function($p0, $p1) {
    return String.format('{0}_{1}_{2}', $p0, $p1, XrmClientApi.WebApi.EntityMetadataCache.$12());
}
XrmClientApi.WebApi.EntityMetadataCache.$1B = function($p0, $p1) {
    if (!XrmClientApi.WebApi.EntityMetadataCache.$E) {
        XrmClientApi.WebApi.EntityMetadataCache.$E = {};
    }
    XrmClientApi.WebApi.EntityMetadataCache.$E[$p0] = $p1;
}
XrmClientApi.WebApi.EntityMetadataCache.$1A = function($p0) {
    if (!XrmClientApi.WebApi.EntityMetadataCache.$E) {
        return null;
    }
    return XrmClientApi.WebApi.EntityMetadataCache.$E[$p0];
}
XrmClientApi.WebApi.EntityMetadataCache.retrieveValueFromCache = function(entityType, type) {
    return XrmClientApi.WebApi.EntityMetadataCache.$1A(XrmClientApi.WebApi.EntityMetadataCache.$d(entityType, type));
}
XrmClientApi.WebApi.EntityMetadataCache.storeValueInCache = function(data, entityType, type) {
    if (data) {
        XrmClientApi.WebApi.EntityMetadataCache.$1B(XrmClientApi.WebApi.EntityMetadataCache.$d(entityType, type), data);
    }
}

XrmClientApi.WebApi.JSResponse = function(request) {
    this.headers = this.$11_0(request.getAllResponseHeaders());
    this.ok = this.$18_0(request.status);
    this.status = request.status;
    this.statusText = request.statusText;
    this.responseText = request.responseText;
    this.url = request.responseURL;
}
XrmClientApi.WebApi.JSResponse.prototype = {
    headers: null,
    ok: false,
    status: 0,
    statusText: null,
    responseText: null,
    url: null,

    text: function() {
        var $v_0 = jQueryApi.jQueryDeferredFactory.Deferred(String, Object);
        $v_0.resolve(this.responseText);
        return $v_0.promise();
    },

    json: function() {
        var $v_0 = jQueryApi.jQueryDeferredFactory.Deferred(Object, Object);
        try {
            var $v_1 = JSON.parse(this.responseText);
            $v_0.resolve($v_1);
        } catch ($v_2) {
            $v_0.reject($v_2);
        }
        return $v_0.promise();
    },

    $11_0: function($p0) {
        if (!$p0) {
            return null;
        }
        var $v_0 = {};
        var $v_1 = $p0.split('\n');
        for (var $v_2 = 0; $v_2 < $v_1.length; $v_2++) {
            var $v_3 = $v_1[$v_2].indexOf(':');
            var $v_4 = $v_1[$v_2].substr(0, $v_3);
            var $v_5 = $v_1[$v_2].substr($v_3 + 2);
            if ($v_4 && $v_4.length > 0) {
                $v_0[$v_4] = $v_5.trim();
            }
        }
        return $v_0;
    },

    $18_0: function($p0) {
        return (Array.indexOf(XrmClientApi.WebApi.Constants.successCodes, $p0) !== -1);
    }
}

XrmClientApi.WebApi.ODataAssociateRequest = function(target, relationship, relatedEntities) {
    XrmClientApi.WebApi.ODataAssociateRequest.initializeBase(this);
    this.target = target;
    this.relationship = relationship;
    this.relatedEntities = relatedEntities;
}
XrmClientApi.WebApi.ODataAssociateRequest.prototype = {
    target: null,
    relationship: null,
    relatedEntities: null,

    getMetadata: function() {
        var $v_0 = new XrmClientApi.WebApi.ODataContractMetadata();
        $v_0.boundParameter = 'target';
        var $v_1 = {};
        $v_1['typeName'] = 'mscrm.crmbaseentity';
        $v_1['structuralProperty'] = 5;
        var $v_2 = {};
        $v_2['typeName'] = 'Edm.String';
        $v_2['structuralProperty'] = 1;
        var $v_3 = {};
        $v_3['typeName'] = 'mscrm.crmbaseentity';
        $v_3['structuralProperty'] = 4;
        $v_0.parameterTypes = {};
        $v_0.parameterTypes['target'] = $v_1;
        $v_0.parameterTypes['relationship'] = $v_2;
        $v_0.parameterTypes['relatedEntities'] = $v_3;
        $v_0.operationName = 'Associate';
        $v_0.operationType = 2;
        return $v_0;
    }
}

XrmClientApi.WebApi.ODataContract = function() {}
XrmClientApi.WebApi.ODataContract.prototype = {
    parameters: null
}

XrmClientApi.WebApi.ODataCreateRequest = function(etn, payload) {
    XrmClientApi.WebApi.ODataCreateRequest.initializeBase(this);
    this.etn = etn;
    this.payload = payload;
}
XrmClientApi.WebApi.ODataCreateRequest.prototype = {
    etn: null,
    payload: null,

    getMetadata: function() {
        var $v_0 = new XrmClientApi.WebApi.ODataContractMetadata();
        $v_0.boundParameter = null;
        $v_0.parameterTypes = {};
        $v_0.operationName = 'Create';
        $v_0.operationType = 2;
        return $v_0;
    }
}

XrmClientApi.WebApi.ODataDeleteRequest = function(entityRef) {
    XrmClientApi.WebApi.ODataDeleteRequest.initializeBase(this);
    this.entityReference = entityRef;
}
XrmClientApi.WebApi.ODataDeleteRequest.prototype = {
    entityReference: null,

    getMetadata: function() {
        var $v_0 = new XrmClientApi.WebApi.ODataContractMetadata();
        $v_0.boundParameter = null;
        $v_0.parameterTypes = {};
        $v_0.operationName = 'Delete';
        $v_0.operationType = 2;
        return $v_0;
    }
}

XrmClientApi.WebApi.ODataDisassociateRequest = function(target, relationship, relatedEntityId) {
    XrmClientApi.WebApi.ODataDisassociateRequest.initializeBase(this);
    this.target = target;
    this.relationship = relationship;
    this.relatedEntityId = relatedEntityId;
}
XrmClientApi.WebApi.ODataDisassociateRequest.prototype = {
    target: null,
    relationship: null,
    relatedEntityId: null,

    getMetadata: function() {
        var $v_0 = new XrmClientApi.WebApi.ODataContractMetadata();
        $v_0.boundParameter = 'target';
        $v_0.parameterTypes = {};
        $v_0.operationName = 'Disassociate';
        $v_0.operationType = 2;
        return $v_0;
    }
}

XrmClientApi.WebApi.ODataRetrieveRequest = function(entityRef, columns) {
    XrmClientApi.WebApi.ODataRetrieveRequest.initializeBase(this);
    this.entityReference = entityRef;
    this.columns = columns;
}
XrmClientApi.WebApi.ODataRetrieveRequest.prototype = {
    entityReference: null,
    columns: null,

    getMetadata: function() {
        var $v_0 = new XrmClientApi.WebApi.ODataContractMetadata();
        $v_0.boundParameter = null;
        $v_0.parameterTypes = {};
        $v_0.operationName = 'Retrieve';
        $v_0.operationType = 2;
        return $v_0;
    }
}

XrmClientApi.WebApi.ODataUpdateRequest = function(etn, id, payload) {
    XrmClientApi.WebApi.ODataUpdateRequest.initializeBase(this);
    this.etn = etn;
    this.id = id;
    this.payload = payload;
}
XrmClientApi.WebApi.ODataUpdateRequest.prototype = {
    etn: null,
    id: null,
    payload: null,

    getMetadata: function() {
        var $v_0 = new XrmClientApi.WebApi.ODataContractMetadata();
        $v_0.boundParameter = null;
        $v_0.parameterTypes = {};
        $v_0.operationName = 'Update';
        $v_0.operationType = 2;
        return $v_0;
    }
}

XrmClientApi.WebApi.ODataContractMetadata = function() {}
XrmClientApi.WebApi.ODataContractMetadata.prototype = {
    boundParameter: null,
    parameterTypes: null,
    operationName: null,
    operationType: 0
}

XrmClientApi.WebApi.ODataParameterType = function() {}
XrmClientApi.WebApi.ODataParameterType.prototype = {
    structuralProperty: 0,
    typeName: null,
    enumProperties: null
}

XrmClientApi.WebApi.ODataEnumValue = function() {}
XrmClientApi.WebApi.ODataEnumValue.prototype = {
    name: null,
    value: 0
}

XrmClientApi.WebApi.ODataRequestBuilder = function() {}
XrmClientApi.WebApi.ODataRequestBuilder.$h = function($p0, $p1) {
    if (!$p0) {
        throw Error.create('Cannot generate base URL for the OData call: the routine name is empty.');
    }
    if (!$p1) {
        throw Error.create('Cannot generate base URL for the OData call: the request is empty.');
    }
    if (!($p1)['getMetadata']) {
        throw Error.create('Cannot generate base URL for the OData call: the request metadata is empty.');
    }
    var $v_0 = $p1.getMetadata().boundParameter;
    if (!Mscrm.InternalUtilities.JSTypes.isNullOrEmptyString($v_0)) {
        var $v_1 = $p1.getMetadata();
        if (Mscrm.InternalUtilities.JSTypes.isNull($v_1) || Mscrm.InternalUtilities.JSTypes.isNull($v_1.parameterTypes) || Mscrm.InternalUtilities.JSTypes.isNull($v_1.parameterTypes[$v_0])) {
            return null;
        }
        var $v_2 = $v_1.parameterTypes[$v_0];
        if ($v_2.structuralProperty === 4) {
            var $v_3 = null;
            var $v_4 = $v_2.typeName;
            if (!Mscrm.InternalUtilities.JSTypes.isNullOrEmptyString($v_4)) {
                $v_3 = ($v_4.split('.').pop());
            }
            if (!$v_3) {
                return null;
            }
            return String.format(XrmClientApi.WebApi.Constants.oDataBaseUrlFormat1, XrmClientApi.WebApi.WebApiParser.getCollectionName($v_3), $p0);
        } else {
            var $v_5 = $p1;
            var $v_6 = $v_5[$v_0];
            var $v_7 = new XrmClientApi.WebApi.EntityReference($v_6['id'],$v_6['entityType']);
            return String.format(XrmClientApi.WebApi.Constants.oDataBaseUrlFormat2, XrmClientApi.WebApi.WebApiParser.getCollectionName($v_7.entityType), $v_7.id, $p0);
        }
    } else {
        return String.format(XrmClientApi.WebApi.Constants.oDataBaseUrlFormat3, $p0);
    }
}
XrmClientApi.WebApi.ODataRequestBuilder.$13 = function($p0) {
    return XrmClientApi.WebApi.ODataRequestBuilder.$h($p0.getMetadata().operationName, $p0);
}
XrmClientApi.WebApi.ODataRequestBuilder.$14 = function($p0) {
    var $v_0 = XrmClientApi.WebApi.ODataRequestBuilder.$h($p0.getMetadata().operationName, $p0);
    var $v_1 = XrmClientApi.WebApi.Serialization.ODataSerializer.serializeIntoURLFragment($p0);
    return $v_0 + $v_1;
}
XrmClientApi.WebApi.ODataRequestBuilder.$10 = function($p0, $p1, $p2) {
    if (!$p0 || !$p1 || !$p2) {
        throw Error.create('Cannot serialize associate request. All parameters are mandatory, but some were passed in empty');
    }
    var $v_0 = XrmClientApi.WebApi.WebApiParser.getCollectionName($p0.entityType);
    var $v_1 = XrmClientApi.WebApi.WebApiParser.getCollectionName($p2.entityType);
    var $v_2;
    var $v_3;
    var $v_4 = XrmClientApi.WebApi.Util.getOneToManyRelationship($p0.entityType, $p1);
    var $v_5 = XrmClientApi.WebApi.Util.getManyToManyRelationship($p0.entityType, $p1);
    var $v_6 = XrmClientApi.WebApi.Util.getManyToOneRelationship($p0.entityType, $p1);
    if ($v_4 || $v_5) {
        $v_2 = 'POST';
        $v_3 = $p1;
    } else if ($v_6) {
        $v_2 = 'PUT';
        $v_3 = $v_6['ReferencingEntityNavigationPropertyName'];
    } else {
        throw Error.create(String.format('No metadata is available for the relationship with the name {0}', $p1));
    }
    var $v_7 = {};
    $v_7['@odata.context'] = Xrm.Page.context.getClientUrl() + '/api/data/v9.0/' + '$metadata#$ref';
    $v_7['@odata.id'] = String.format('{0}({1})', $v_1, $p2.id);
    var $v_8 = new XrmClientApi.WebApi.Serialization.SerializedRequest();
    $v_8.method = $v_2;
    $v_8.urlParameters = String.format(XrmClientApi.WebApi.Constants.associateRequestURLParameterFormat, $v_0, $p0.id, $v_3);
    $v_8.body = JSON.stringify($v_7);
    $v_8.additionalHeaders = {};
    $v_8.additionalHeaders['Accept'] = 'application/json';
    return null;
}
XrmClientApi.WebApi.ODataRequestBuilder.$n = function($p0) {
    var $v_0 = XrmClientApi.WebApi.ODataRequestBuilder.$13($p0);
    var $v_1 = new XrmClientApi.WebApi.Serialization.SerializedRequest();
    $v_1.urlParameters = $v_0;
    $v_1.additionalHeaders = {};
    $v_1.additionalHeaders['Accept'] = 'application/json';
    $v_1.method = 'POST';
    $v_1.body = XrmClientApi.WebApi.Serialization.ODataSerializer.serializeContract($p0);
    return $v_1;
}
XrmClientApi.WebApi.ODataRequestBuilder.$u = function($p0) {
    var $v_0 = XrmClientApi.WebApi.ODataRequestBuilder.$14($p0);
    var $v_1 = new XrmClientApi.WebApi.Serialization.SerializedRequest();
    $v_1.urlParameters = $v_0;
    $v_1.additionalHeaders = {};
    $v_1.additionalHeaders['Accept'] = 'application/json';
    $v_1.additionalHeaders['Prefer'] = 'odata.include-annotations=\"*\"';
    $v_1.method = 'GET';
    return $v_1;
}
XrmClientApi.WebApi.ODataRequestBuilder.$q = function($p0, $p1) {
    var $v_0 = new XrmClientApi.WebApi.Serialization.SerializedRequest();
    $v_0.urlParameters = XrmClientApi.WebApi.WebApiParser.getCollectionName($p0);
    $v_0.additionalHeaders = {};
    $v_0.additionalHeaders['Accept'] = 'application/json';
    $v_0.additionalHeaders['MSCRM.SuppressDuplicateDetection'] = 'true';
    $v_0.method = 'POST';
    $v_0.body = JSON.stringify($p1);
    return $v_0;
}
XrmClientApi.WebApi.ODataRequestBuilder.$x = function($p0, $p1) {
    var $v_0 = new XrmClientApi.WebApi.Serialization.SerializedRequest();
    $v_0.urlParameters = XrmClientApi.WebApi.Serialization.ODataSerializer.buildRetrieveRequestURLParameter($p0, $p1);
    $v_0.additionalHeaders = {};
    $v_0.additionalHeaders['Prefer'] = 'odata.include-annotations=\" * \"';
    $v_0.additionalHeaders['Accept'] = 'application/json';
    $v_0.additionalHeaders['MSCRM.ReturnNotifications'] = 'true';
    $v_0.method = 'GET';
    return $v_0;
}
XrmClientApi.WebApi.ODataRequestBuilder.$z = function($p0, $p1, $p2) {
    var $v_0 = new XrmClientApi.WebApi.Serialization.SerializedRequest();
    $v_0.urlParameters = XrmClientApi.WebApi.WebApiParser.getCollectionName($p0) + '(' + $p1 + ')';
    $v_0.additionalHeaders = {};
    $v_0.additionalHeaders['If-match'] = '*';
    $v_0.additionalHeaders['MSCRM.SuppressDuplicateDetection'] = 'true';
    $v_0.method = 'PATCH';
    $v_0.body = JSON.stringify($p2);
    return $v_0;
}
XrmClientApi.WebApi.ODataRequestBuilder.$s = function($p0) {
    var $v_0 = new XrmClientApi.WebApi.Serialization.SerializedRequest();
    $v_0.urlParameters = XrmClientApi.WebApi.WebApiParser.getCollectionName($p0.entityType) + '(' + $p0.id + ')';
    $v_0.method = 'DELETE';
    return $v_0;
}
XrmClientApi.WebApi.ODataRequestBuilder.$o = function($p0, $p1, $p2) {
    var $v_0 = new Array(0);
    for (var $v_1 = 0; $v_1 < $p2.length; $v_1++) {
        $v_0.push(XrmClientApi.WebApi.ODataRequestBuilder.$10($p0, $p1, $p2[$v_1]));
    }
    if ($v_0.length === 1) {
        return $v_0[0];
    } else {
        return XrmClientApi.WebApi.ODataRequestBuilder.buildBatchRequest($v_0);
    }
}
XrmClientApi.WebApi.ODataRequestBuilder.$t = function($p0, $p1, $p2) {
    if (!$p0 || !$p1) {
        throw Error.create('Cannot serialize associate request. All required parameters are mandatory, but some were passed in empty');
    }
    var $v_0 = XrmClientApi.WebApi.WebApiParser.getCollectionName($p0.entityType);
    var $v_1 = new XrmClientApi.WebApi.Serialization.SerializedRequest();
    $v_1.method = 'DELETE';
    $v_1.urlParameters = String.format(XrmClientApi.WebApi.Constants.disassociateUrlParameterFormat, $v_0, $p0.id, $p1, (($p2) ? ('(' + $p2 + ')') : ('')));
    $v_1.additionalHeaders = {};
    $v_1.additionalHeaders['Accept'] = 'application/json';
    return $v_1;
}
XrmClientApi.WebApi.ODataRequestBuilder.$r = function($p0) {
    var $v_0 = $p0.getMetadata().operationName;
    switch ($v_0) {
    case 'Create':
        var $v_1 = $p0;
        return XrmClientApi.WebApi.ODataRequestBuilder.$q($v_1.etn, $v_1.payload);
    case 'Retrieve':
        var $v_2 = $p0;
        return XrmClientApi.WebApi.ODataRequestBuilder.$x(XrmClientApi.WebApi.EntityReference.createEntityRefObj($v_2.entityReference), $v_2.columns);
    case 'Update':
        var $v_3 = $p0;
        return XrmClientApi.WebApi.ODataRequestBuilder.$z($v_3.etn, $v_3.id, $v_3.payload);
    case 'Delete':
        var $v_4 = $p0;
        return XrmClientApi.WebApi.ODataRequestBuilder.$s($v_4.entityReference);
    case 'Associate':
        var $v_5 = $p0;
        var $v_6 = XrmClientApi.WebApi.EntityReference.createEntityRefObj($v_5.target);
        var $v_7 = new Array(0);
        for (var $v_A = 0; $v_A < $v_5.relatedEntities.length; $v_A++) {
            $v_7.push(XrmClientApi.WebApi.EntityReference.createEntityRefObj($v_5.relatedEntities[$v_A]));
        }
        return XrmClientApi.WebApi.ODataRequestBuilder.$o($v_6, $v_5.relationship, $v_7);
    case 'Disassociate':
        var $v_8 = $p0;
        var $v_9 = XrmClientApi.WebApi.EntityReference.createEntityRefObj($v_8.target);
        return XrmClientApi.WebApi.ODataRequestBuilder.$t($v_9, $v_8.relationship, $v_8.relatedEntityId);
    }
    return null;
}
XrmClientApi.WebApi.ODataRequestBuilder.buildRequest = function(request) {
    var $v_0 = request.getMetadata().operationType;
    switch ($v_0) {
    case 0:
        return XrmClientApi.WebApi.ODataRequestBuilder.$n(request);
    case 1:
        return XrmClientApi.WebApi.ODataRequestBuilder.$u(request);
    case 2:
        return XrmClientApi.WebApi.ODataRequestBuilder.$r(request);
    }
    return null;
}
XrmClientApi.WebApi.ODataRequestBuilder.$U = function() {
    return window.ORG_UNIQUE_NAME;
}
XrmClientApi.WebApi.ODataRequestBuilder.$W = function() {
    return window.IS_LIVE;
}
XrmClientApi.WebApi.ODataRequestBuilder.$X = function() {
    return !(window.IS_ONLINE) && window.IS_OUTLOOK_CLIENT;
}
XrmClientApi.WebApi.ODataRequestBuilder.$p = function($p0, $p1) {
    var $v_0 = '';
    var $v_1 = 1;
    for (var $v_2 = 0; $v_2 < $p1.length; $v_2++) {
        var $v_3 = $p1[$v_2];
        if (!Mscrm.InternalUtilities.JSTypes.isNullOrEmptyString($v_3.serializationFailure)) {
            throw Error.create('Error occurred during serialization: ' + $v_3.serializationFailure);
        }
        $v_0 += '--' + $p0 + '\n';
        $v_0 += 'Content-Type: application/http\nContent-Transfer-Encoding: binary\n';
        $v_0 += 'Content-ID: ' + ($v_1++) + '\n';
        $v_0 += '\n';
        if (!XrmClientApi.WebApi.ODataRequestBuilder.$W() && !XrmClientApi.WebApi.ODataRequestBuilder.$X()) {
            $v_0 += String.format('{0} /{1}/api/data/v9.0/{2} HTTP/1.1', $v_3.method, XrmClientApi.WebApi.ODataRequestBuilder.$U(), $v_3.urlParameters);
        } else {
            $v_0 += String.format('{0} /api/data/v9.0/{1} HTTP/1.1', $v_3.method, $v_3.urlParameters);
        }
        $v_0 += '\n';
        var $v_4 = XrmClientApi.WebApi.WebApiService.getKeysFromDictionary($v_3.additionalHeaders);
        for (var $v_5 = 0; $v_5 < $v_4.length; $v_5++) {
            $v_0 += String.format('\n{0}: {1}', $v_4[$v_5], $v_3.additionalHeaders[$v_4[$v_5]]);
            $v_0 += '\n';
        }
        $v_0 += 'Content-Type: application/json;type=entry\n';
        $v_0 += '\n';
        if (!Mscrm.InternalUtilities.JSTypes.isNullOrEmptyString($v_3.body)) {
            $v_0 += $v_3.body + '\n';
        }
    }
    $v_0 += '--' + $p0 + '--' + '\n';
    return $v_0;
}
XrmClientApi.WebApi.ODataRequestBuilder.$v = function($p0) {
    var $v_0 = '';
    if (!XrmClientApi.WebApi.ODataRequestBuilder.$W() && !XrmClientApi.WebApi.ODataRequestBuilder.$X()) {
        $v_0 = String.format('GET /{0}/api/data/v9.0/{1} HTTP/1.1', XrmClientApi.WebApi.ODataRequestBuilder.$U(), $p0.urlParameters);
    } else {
        $v_0 = String.format('GET /api/data/v9.0/{0} HTTP/1.1', $p0.urlParameters);
    }
    $v_0 += '\n';
    var $v_1 = XrmClientApi.WebApi.WebApiService.getKeysFromDictionary($p0.additionalHeaders);
    for (var $v_2 = 0; $v_2 < $v_1.length; $v_2++) {
        $v_0 += String.format('{0}: {1}', $v_1[$v_2], $p0.additionalHeaders[$v_1[$v_2]]);
        $v_0 += '\n';
    }
    return $v_0;
}
XrmClientApi.WebApi.ODataRequestBuilder.$y = function($p0) {
    var $v_0 = '';
    if (!XrmClientApi.WebApi.ODataRequestBuilder.$W() && !XrmClientApi.WebApi.ODataRequestBuilder.$X()) {
        $v_0 = String.format('{0} {1}/api/data/v9.0/{2} HTTP/1.1', $p0.method, '/' + XrmClientApi.WebApi.ODataRequestBuilder.$U(), $p0.urlParameters) + '\n';
    } else {
        $v_0 = String.format('{0} /api/data/v9.0/{1} HTTP/1.1', $p0.method, $p0.urlParameters) + '\n';
    }
    var $v_1 = XrmClientApi.WebApi.WebApiService.getKeysFromDictionary($p0.additionalHeaders);
    for (var $v_2 = 0; $v_2 < $v_1.length; $v_2++) {
        $v_0 += String.format('{0}: {1}', $v_1[$v_2], $p0.additionalHeaders[$v_1[$v_2]]);
        $v_0 += '\n';
    }
    $v_0 += 'Content-Type: application/json;type=entry\n';
    $v_0 += '\n' + $p0.body;
    return $v_0;
}
XrmClientApi.WebApi.ODataRequestBuilder.buildBatchRequest = function(requests) {
    var $v_0 = '';
    var $v_1 = 'batch_' + (new Date().getTime());
    for (var $v_3 = 0; $v_3 < requests.length; $v_3++) {
        var $v_4 = requests[$v_3];
        $v_0 += '--' + $v_1 + '\n';
        var $v_5 = '';
        if (Mscrm.InternalUtilities.JSTypes.isArray($v_4)) {
            var $v_6 = $v_4;
            var $v_7 = 'changeset_' + (new Date().getTime());
            $v_5 = XrmClientApi.WebApi.ODataRequestBuilder.$p($v_7, $v_6);
            $v_0 += 'Content-Type: multipart/mixed;boundary=' + $v_7 + '\n';
        } else {
            var $v_8 = $v_4;
            if (!Mscrm.InternalUtilities.JSTypes.isNullOrEmptyString($v_8.serializationFailure)) {
                throw Error.create('Error occurred during Serialization: ' + $v_8.serializationFailure);
            }
            if ($v_8.method === 'GET') {
                $v_5 = XrmClientApi.WebApi.ODataRequestBuilder.$v($v_8);
            } else {
                $v_5 = XrmClientApi.WebApi.ODataRequestBuilder.$y($v_8);
            }
            $v_0 += 'Content-Type: application/http\n';
            $v_0 += 'Content-Transfer-Encoding: binary\n';
        }
        $v_0 += '\n';
        $v_0 += $v_5;
        $v_0 += '\n';
    }
    $v_0 += '--' + $v_1 + '--' + '\r\n\u0000';
    var $v_2 = new XrmClientApi.WebApi.Serialization.SerializedRequest();
    $v_2.urlParameters = '$batch';
    $v_2.additionalHeaders = {};
    $v_2.additionalHeaders['Content-Type'] = 'multipart/mixed;boundary=' + $v_1;
    $v_2.additionalHeaders['Accept'] = 'application/json';
    $v_2.body = $v_0;
    $v_2.method = 'POST';
    return $v_2;
}

XrmClientApi.WebApi.Response = function(deferred, bodyString) {
    this.$M_0 = deferred;
    this.$G_0 = bodyString;
}
XrmClientApi.WebApi.Response.prototype = {
    $M_0: null,
    $G_0: null,
    status: 0,
    ok: false,
    statusText: null,
    headers: null,

    clone: function() {
        return Object.assign({}, this);
    },

    json: function() {
        var $v_0 = null;
        if (!Mscrm.InternalUtilities.JSTypes.isNullOrEmptyString(this.$G_0)) {
            $v_0 = JSON.parse(this.$G_0);
        }
        return this.$M_0.resolve($v_0);
    },

    text: function() {
        return this.$M_0.resolve(this.$G_0);
    }
}

XrmClientApi.WebApi.RetrieveMultipleResponse = function(entities, nextLink) {
    this.entities = entities;
    this.nextLink = nextLink;
}
XrmClientApi.WebApi.RetrieveMultipleResponse.prototype = {
    entities: null,
    nextLink: null
}

XrmClientApi.WebApi.Util = function() {}
XrmClientApi.WebApi.Util.checkParameters = function(parameters, names) {
    if (parameters.length !== names.length) {
        return;
    }
    for (var $v_0 = 0; $v_0 < parameters.length; $v_0++) {
        if (Mscrm.InternalUtilities.JSTypes.isNull(parameters[$v_0])) {
            throw Error.create(String.format('{0} is a mandatory Parameter and it cannot be  null.', names[$v_0]));
        }
    }
}
XrmClientApi.WebApi.Util.getParticipationTypeMask = function(entityLogicalName, attributeName) {
    var $v_0 = String.format('{0}.{1}', entityLogicalName, attributeName).toLowerCase();
    switch ($v_0) {
    case 'campaignactivity.partners':
    case 'campaignactivity.from':
    case 'fax.from':
    case 'email.from':
    case 'letter.from':
    case 'phonecall.from':
        return 1;
    case 'email.to':
    case 'fax.to':
    case 'letter.to':
    case 'phonecall.to':
        return 2;
    case 'email.cc':
        return 3;
    case 'email.bcc':
    case 'letter.bcc':
        return 4;
    case 'appointment.optionalattendees':
    case 'recurringappointmentmaster.optionalattendees':
        return 6;
    case 'appointment.organizer':
    case 'recurringappointmentmaster.organizer':
        return 7;
    case 'appointment.requiredattendees':
    case 'recurringappointmentmaster.requiredattendees':
        return 5;
    case 'campaignresponse.customer':
    case 'campaignresponse.partner':
    case 'campaignresponse.from':
    case 'serviceappointment.customer':
        return 11;
    case 'serviceappointment.resources':
        return 10;
    default:
        return 12;
    }
}
XrmClientApi.WebApi.Util.$A = function($p0) {
    Xrm.Utility.getEntityMetadata($p0, ['relationships']);
}
XrmClientApi.WebApi.Util.getAttributeDescriptor = function(entityType, columnName) {
    var $v_0 = XrmClientApi.WebApi.EntityMetadataCache.retrieveValueFromCache(entityType, 'Attributes');
    var $v_1 = null;
    if ($v_0) {
        for (var $v_2 = 0; $v_2 < $v_0.length; $v_2++) {
            var $v_3 = $v_0[$v_2];
            if ($v_3['LogicalName'] === columnName) {
                $v_1 = $v_3;
                break;
            }
        }
    }
    if ($v_1) {
        return $v_1;
    } else {
        XrmClientApi.WebApi.Util.$A(entityType);
        throw Error.create(String.format('Attribute metadata is not available for {0} in cache', columnName));
    }
}
XrmClientApi.WebApi.Util.getOneToManyRelationships = function(entityType) {
    var $v_0 = XrmClientApi.WebApi.EntityMetadataCache.retrieveValueFromCache(entityType, 'OneToManyRelationships');
    if ($v_0) {
        return $v_0;
    } else {
        XrmClientApi.WebApi.Util.$A(entityType);
        throw Error.create(String.format('oneToManyRelationships are not available for {0} in cache', entityType));
    }
}
XrmClientApi.WebApi.Util.getOneToManyRelationship = function(entityType, relationship) {
    var $v_0 = XrmClientApi.WebApi.Util.getOneToManyRelationships(entityType);
    for (var $v_1 = 0; $v_1 < $v_0.length; $v_1++) {
        if (($v_0[$v_1]['SchemaName']) === relationship) {
            return $v_0[$v_1];
        }
    }
    XrmClientApi.WebApi.Util.$A(entityType);
    throw Error.create(String.format('oneToManyRelationships metadata are not available for {0}', relationship));
}
XrmClientApi.WebApi.Util.getManyToOneRelationships = function(entityType) {
    var $v_0 = XrmClientApi.WebApi.EntityMetadataCache.retrieveValueFromCache(entityType, 'ManyToOneRelationships');
    if ($v_0) {
        return $v_0;
    } else {
        XrmClientApi.WebApi.Util.$A(entityType);
        throw Error.create(String.format('manyToOneRelationships are not available for {0} in cache', entityType));
    }
}
XrmClientApi.WebApi.Util.getManyToOneRelationship = function(entityType, relationship) {
    var $v_0 = XrmClientApi.WebApi.Util.getManyToOneRelationships(entityType);
    for (var $v_1 = 0; $v_1 < $v_0.length; $v_1++) {
        if (($v_0[$v_1]['SchemaName']) === relationship) {
            return $v_0[$v_1];
        }
    }
    XrmClientApi.WebApi.Util.$A(entityType);
    throw Error.create(String.format('GetManyToOneRelationships metadata are not available for {0}', relationship));
}
XrmClientApi.WebApi.Util.getManyToManyRelationships = function(entityType) {
    var $v_0 = XrmClientApi.WebApi.EntityMetadataCache.retrieveValueFromCache(entityType, 'ManyToManyRelationships');
    if ($v_0) {
        return $v_0;
    } else {
        XrmClientApi.WebApi.Util.$A(entityType);
        throw Error.create(String.format('manyToManyRelationships are not available for {0} in cache', entityType));
    }
}
XrmClientApi.WebApi.Util.getManyToManyRelationship = function(entityType, relationship) {
    var $v_0 = XrmClientApi.WebApi.Util.getManyToManyRelationships(entityType);
    for (var $v_1 = 0; $v_1 < $v_0.length; $v_1++) {
        if (($v_0[$v_1]['SchemaName']) === relationship) {
            return $v_0[$v_1];
        }
    }
    XrmClientApi.WebApi.Util.$A(entityType);
    throw Error.create(String.format('GetManyToManyRelationship metadata are not available for {0}', relationship));
}
XrmClientApi.WebApi.Util.getEntityMetadata = function(entityType) {
    return XrmClientApi.WebApi.EntityMetadataCache.retrieveValueFromCache(entityType, 'EntityMetadata');
}
XrmClientApi.WebApi.Util.isRelationshipMetadataAvailable = function(entityType) {
    return !!XrmClientApi.WebApi.EntityMetadataCache.retrieveValueFromCache(entityType, 'OneToManyRelationships');
}

XrmClientApi.WebApi.WebApiParser = function() {}
XrmClientApi.WebApi.WebApiParser.trimEntityId = function(entityId) {
    var $v_0 = new Microsoft.Crm.Client.Core.Framework.Guid(entityId);
    return $v_0.toString().replace('{', '').replace('}', '');
}
XrmClientApi.WebApi.WebApiParser.trimOptions = function(options) {
    if (!options || options === '') {
        return '';
    }
    return (options.charAt(0) !== '?') ? ('?' + options) : options;
}
XrmClientApi.WebApi.WebApiParser.trimUrl = function(url) {
    if (!url || url === '') {
        return '';
    }
    return url.split('\n').join('');
}
XrmClientApi.WebApi.WebApiParser.getCollectionName = function(entityName) {
    var $v_0 = Xrm.Utility.getEntitySetName(entityName);
    if (!Mscrm.InternalUtilities.JSTypes.isNullOrEmptyString($v_0)) {
        return $v_0;
    }
    return entityName;
}
XrmClientApi.WebApi.WebApiParser.getGuidFromResponse = function(request) {
    var $v_0 = request.getResponseHeader('OData-EntityId');
    if (Mscrm.InternalUtilities.JSTypes.isNullOrEmptyString($v_0)) {
        return null;
    }
    var $v_1 = $v_0.indexOf('(') + 1;
    var $v_2 = $v_0.substr($v_1, $v_0.length - $v_1 - 1);
    return $v_2;
}
XrmClientApi.WebApi.WebApiParser.$15 = function($p0) {
    var $v_0 = ($p0.getResponseHeader('Content-Type').split('; ').pop());
    return ($v_0.split('=').pop());
}
XrmClientApi.WebApi.WebApiParser.$k = function($p0, $p1) {
    var $v_0 = $p1.split(new RegExp('--' + $p0 + '-*\r?\n'));
    return $v_0.slice(1, $v_0.length - 1);
}
XrmClientApi.WebApi.WebApiParser.$j = function($p0, $p1) {
    var $v_0 = $p1.indexOf(':');
    if ($v_0 !== -1) {
        var $v_1 = $p1.substr(0, $v_0);
        var $v_2 = $p1.substr($v_0 + 1).trim();
        $p0[$v_1] = $v_2;
    }
}
XrmClientApi.WebApi.WebApiParser.$e = function($p0, $p1) {
    var $v_0 = $p0.trim().split(new RegExp('\r?\n\r?\n','gi'));
    var $v_1 = $v_0[0].split(new RegExp('\r?\n','gi'));
    var $v_2 = {};
    for (var $v_B = 0; $v_B < $v_1.length; $v_B++) {
        XrmClientApi.WebApi.WebApiParser.$j($v_2, $v_1[$v_B]);
    }
    var $v_3 = $v_2['Content-ID'];
    var $v_4 = $v_0[1].split(new RegExp('\r?\n','gi'));
    var $v_5 = $v_4.slice(1, $v_4.length - 1);
    var $v_6 = (new RegExp('(HTTP\\/\\d\\.\\d) (\\d+) (.*)','gi')).exec($v_4[0]);
    var $v_7 = parseInt($v_6[2]);
    var $v_8 = {};
    for (var $v_C = 0; $v_C < $v_5.length; $v_C++) {
        XrmClientApi.WebApi.WebApiParser.$j($v_8, $v_5[$v_C]);
    }
    var $v_9 = $v_0[2];
    var $v_A = new XrmClientApi.WebApi.Response($p1,$v_9);
    $v_A.status = $v_7;
    $v_A.ok = ((200 <= $v_7) && (299 >= $v_7));
    $v_A.statusText = $v_6[3];
    $v_A.headers = $v_8;
    return $v_A;
}
XrmClientApi.WebApi.WebApiParser.parseBatchResponse = function(response, deferred) {
    var $v_0 = XrmClientApi.WebApi.WebApiParser.$15(response);
    var $v_1 = response.responseText;
    var $v_2 = XrmClientApi.WebApi.WebApiParser.$k($v_0, $v_1);
    var $v_3 = new Array(0);
    for (var $v_4 = 0; $v_4 < $v_2.length; $v_4++) {
        var $v_5 = $v_2[$v_4];
        var $v_6 = new RegExp('Content-Type: .*boundary=(.*)\r?\n','gi');
        var $v_7 = $v_6.exec($v_5);
        if (!Mscrm.InternalUtilities.JSTypes.isNull($v_7) && $v_7.length > 0) {
            var $v_8 = $v_7[1];
            var $v_9 = $v_5.indexOf('--' + $v_8);
            var $v_A = $v_5.substr($v_9);
            var $v_B = XrmClientApi.WebApi.WebApiParser.$k($v_8, $v_A);
            for (var $v_C = 0; $v_C < $v_B.length; $v_C++) {
                $v_3.push(XrmClientApi.WebApi.WebApiParser.$e($v_B[$v_C], deferred));
            }
        } else {
            $v_3.push(XrmClientApi.WebApi.WebApiParser.$e($v_5, deferred));
        }
    }
    return $v_3;
}
XrmClientApi.WebApi.WebApiParser.parseErrorResponseforBatch = function(responseText) {
    return responseText.substring(responseText.indexOf('{\"error\":'), responseText.length).split('--batchresponse')[0];
}

XrmClientApi.WebApi.WebApiService = function() {}
XrmClientApi.WebApi.WebApiService.getKeysFromDictionary = function(dict) {
    return Object.keys(dict);
}
XrmClientApi.WebApi.WebApiService.$w = function($p0) {
    var $v_0 = new XrmClientApi.WebApi.JSResponse($p0);
    return $v_0;
}
XrmClientApi.WebApi.WebApiService.$l = function($p0, $p1, $p2, $p3, $p4, $p5) {
    var $v_0 = {};
    var $v_1 = $p2.responseText;
    switch ($p3) {
    case 0:
        if ($v_1.length > 0) {
            $v_0 = JSON.parse($v_1);
        }
        $p5.resolve($v_0);
        break;
    case 2:
    case 3:
    case 4:
        var $v_2 = new XrmClientApi.WebApi.EntityReference(XrmClientApi.WebApi.WebApiParser.getGuidFromResponse($p2),$p4);
        $p5.resolve($v_2);
        break;
    case 1:
        var $v_3 = null;
        if ($v_1.length > 0) {
            var $v_6 = JSON.parse($v_1);
            if ($v_6) {
                $v_3 = new XrmClientApi.WebApi.RetrieveMultipleResponse($v_6['value'],$v_6['@odata.nextLink']);
            }
        }
        $p5.resolve($v_3);
        break;
    case 5:
        $p5.resolve(XrmClientApi.WebApi.WebApiService.$w($p2));
        break;
    case 6:
        var $v_4 = $p5;
        var $v_5 = XrmClientApi.WebApi.WebApiParser.parseBatchResponse($p2, $v_4);
        $p5.resolve($v_5);
        break;
    }
}
XrmClientApi.WebApi.WebApiService.$f = function($p0, $p1, $p2, $p3, $p4) {
    var $v_0 = null;
    var $v_1 = null;
    var $v_2 = $p2.responseText;
    if ($v_2.indexOf('--batchresponse') === -1) {
        $v_1 = JSON.parse($v_2);
    } else if ($v_2.indexOf('--batchresponse') !== -1 && $v_2.indexOf('{\"error\":') !== -1) {
        $v_1 = JSON.parse(XrmClientApi.WebApi.WebApiParser.parseErrorResponseforBatch($v_2));
    }
    if ($v_1) {
        var $v_3 = $v_1['error'];
        if ($v_3) {
            $v_0 = new XrmClientApi.ErrorResponse(Number.parseInvariant($v_3['code']),$v_3['message'],'',$v_3['innererror']);
        } else {
            $v_0 = new XrmClientApi.ErrorResponse(Number.parseInvariant($v_1['ErrorCode']),$v_1['Message'],$v_1['ExceptionMessage'],$v_1['StackTrace']);
        }
    } else {
        $v_0 = new Xrm.ErrorResponse(0,'Odata Error response is not valid','','');
    }
    $p4.reject($v_0);
}
XrmClientApi.WebApi.WebApiService.getHTTPRequest = function(TData, TError, protocol, requestUrl, operation, entityType, successCodes, deferred, additionalParameters) {
    var $v_0 = new XMLHttpRequest();
    var $v_1 = Xrm.Page.context.getClientUrl() + '/api/data/v9.0/';
    $v_0.open(protocol, $v_1 + requestUrl, true);
    var $v_2 = XrmClientApi.WebApi.WebApiService.$g(additionalParameters);
    var $v_3 = XrmClientApi.WebApi.WebApiService.getKeysFromDictionary($v_2);
    for (var $v_4 = 0; $v_4 < $v_3.length; $v_4++) {
        $v_0.setRequestHeader($v_3[$v_4], $v_2[$v_3[$v_4]]);
    }
    Mscrm.InternalUtilities.ClientApiUtility.stampCurrentReqWithCorrelationToken($v_0);
    $v_0.onreadystatechange = function() {
        if ($v_0.readyState === 4) {
            $v_0.onreadystatechange = null;
            var $v_5 = false;
            for (var $v_6 = 0; $v_6 < successCodes.length; $v_6++) {
                if ($v_0.status === successCodes[$v_6]) {
                    $v_5 = true;
                    break;
                }
            }
            Mscrm.InternalUtilities.ClientApiUtility.saveCurrentResponseToken($v_0);
            if ($v_5) {
                XrmClientApi.WebApi.WebApiService.$l(TData, TError, $v_0, operation, entityType, deferred);
            } else {
                XrmClientApi.WebApi.WebApiService.$f(TData, TError, $v_0, operation, deferred);
            }
            Mscrm.InternalUtilities.ClientApiUtility.clearCurrentCorrelationToken('CurrentResponseId');
        }
    }
    ;
    return $v_0;
}
XrmClientApi.WebApi.WebApiService.$g = function($p0) {
    var $v_0 = {};
    $v_0['Accept'] = 'application/json';
    $v_0['Content-Type'] = 'application/json; charset=utf-8';
    var $v_1 = {};
    if (!Mscrm.InternalUtilities.JSTypes.isNull($p0)) {
        $v_1 = $p0;
    }
    var $v_2 = XrmClientApi.WebApi.WebApiService.getKeysFromDictionary($v_0);
    for (var $v_3 = 0; $v_3 < $v_2.length; $v_3++) {
        var $v_4 = $v_2[$v_3];
        if (Mscrm.InternalUtilities.JSTypes.isNull($v_1[$v_4])) {
            $v_1[$v_4] = $v_0[$v_4];
        }
    }
    return $v_1;
}
XrmClientApi.WebApi.WebApiService.sendSerializedRequest = function(TData, TError, serializedReq, operation, deferred) {
    var $v_0 = new XMLHttpRequest();
    var $v_1 = serializedReq.method;
    var $v_2 = Xrm.Page.context.getClientUrl() + '/api/data/v9.0/' + serializedReq.urlParameters;
    $v_0.open($v_1, $v_2, true);
    var $v_3 = XrmClientApi.WebApi.WebApiService.$g(serializedReq.additionalHeaders);
    var $v_4 = XrmClientApi.WebApi.WebApiService.getKeysFromDictionary($v_3);
    for (var $v_5 = 0; $v_5 < $v_4.length; $v_5++) {
        $v_0.setRequestHeader($v_4[$v_5], $v_3[$v_4[$v_5]]);
    }
    Mscrm.InternalUtilities.ClientApiUtility.stampCurrentReqWithCorrelationToken($v_0);
    $v_0.onreadystatechange = function() {
        if ($v_0.readyState === 4) {
            $v_0.onreadystatechange = null;
            Mscrm.InternalUtilities.ClientApiUtility.saveCurrentResponseToken($v_0);
            if ($v_0.status === 200 || $v_0.status === 204) {
                XrmClientApi.WebApi.WebApiService.$l(TData, TError, $v_0, operation, '', deferred);
            } else {
                XrmClientApi.WebApi.WebApiService.$f(TData, TError, $v_0, operation, deferred);
            }
            Mscrm.InternalUtilities.ClientApiUtility.clearCurrentCorrelationToken('CurrentResponseId');
        }
    }
    ;
    $v_0.send(serializedReq.body);
}

Type.registerNamespace('XrmClientApi.WebApi.Serialization');

XrmClientApi.WebApi.Serialization.ODataSerializer = function() {}
XrmClientApi.WebApi.Serialization.ODataSerializer.getEnumValueMetadata = function(value, parameterType) {
    if (Mscrm.InternalUtilities.JSTypes.isNull(value) || Mscrm.InternalUtilities.JSTypes.isNull(parameterType) || Mscrm.InternalUtilities.JSTypes.isNull(parameterType.enumProperties) || !parameterType.enumProperties.length) {
        return null;
    }
    var $v_0 = parameterType.enumProperties;
    for (var $v_1 = 0; $v_1 < $v_0.length; $v_1++) {
        if ($v_0[$v_1] && $v_0[$v_1].value === value) {
            return $v_0[$v_1];
        }
    }
    return null;
}
XrmClientApi.WebApi.Serialization.ODataSerializer.serializeEntityReference = function(entityRef) {
    var $v_0 = {};
    $v_0['@odata.id'] = XrmClientApi.WebApi.WebApiParser.getCollectionName(entityRef.entityType) + '(' + entityRef.id + ')';
    return $v_0;
}
XrmClientApi.WebApi.Serialization.ODataSerializer.getPrimaryKey = function(entityType) {
    var $v_0 = JSON.parse(window.ENTITY_PRIMARY_KEYS || window.top.ENTITY_PRIMARY_KEYS);
    if (!$v_0) {
        throw Error.create('Primary key information is not available. Try passing primary key explicitly in OData contract');
    }
    return $v_0[entityType];
}
XrmClientApi.WebApi.Serialization.ODataSerializer.serializeEntityReferenceForAction = function(entityRef, primaryKey) {
    var $v_0 = {};
    if (!entityRef) {
        return $v_0;
    }
    if (!primaryKey) {
        primaryKey = XrmClientApi.WebApi.Serialization.ODataSerializer.getPrimaryKey(entityRef.entityType);
    }
    $v_0['@odata.type'] = 'Microsoft.Dynamics.CRM.' + entityRef.entityType;
    $v_0[primaryKey] = XrmClientApi.WebApi.WebApiParser.trimEntityId(entityRef.id);
    return $v_0;
}
XrmClientApi.WebApi.Serialization.ODataSerializer.serializePrimitiveTypeValueForURL = function(typeName, value) {
    switch (typeName) {
    case 'Edm.String':
        return String.format('\'{0}\'', value);
    case 'Edm.Guid':
        return ((value)['guid']);
    case 'Edm.DateTimeOffset':
        if (value && (value)['toISOString']) {
            return value.toISOString();
        }
        break;
    }
    return value;
}
XrmClientApi.WebApi.Serialization.ODataSerializer.serializeEntityType = function(parameterValue, forUrl) {
    if (!parameterValue) {
        return 'null';
    }
    var $v_0 = parameterValue;
    var $v_1 = $v_0['id'];
    var $v_2 = $v_0['entityType'];
    if (!Mscrm.InternalUtilities.JSTypes.isNull($v_1) && !Mscrm.InternalUtilities.JSTypes.isNull($v_2)) {
        var $v_3 = new XrmClientApi.WebApi.EntityReference($v_1,$v_2);
        var $v_4 = (!forUrl) ? (XrmClientApi.WebApi.Serialization.ODataSerializer.serializeEntityReferenceForAction($v_3, $v_0['primaryKey'])) : (XrmClientApi.WebApi.Serialization.ODataSerializer.serializeEntityReference($v_3));
        return JSON.stringify($v_4);
    } else {
        return JSON.stringify(parameterValue);
    }
}
XrmClientApi.WebApi.Serialization.ODataSerializer.serializePrimitiveTypeValue = function(typeName, value) {
    switch (typeName) {
    case 'Edm.String':
        return '\"' + (value).replace(/([^\\])"/g, '$1\\\"') + '\"';
    case 'Edm.Guid':
        return '\"' + (value)['guid'] + '\"';
    case 'Edm.DateTimeOffset':
        if (value && (value)['toISOString']) {
            return '\"' + value.toISOString() + '\"';
        }
        break;
    }
    return value;
}
XrmClientApi.WebApi.Serialization.ODataSerializer.serializeEnumValue = function(value, parameterType) {
    var $v_0 = XrmClientApi.WebApi.Serialization.ODataSerializer.getEnumValueMetadata(value, parameterType);
    if (!$v_0) {
        return '';
    }
    return '\"' + $v_0.name + '\"';
}
XrmClientApi.WebApi.Serialization.ODataSerializer.serializeComplexTypeParameter = function(request, parameterName) {
    var $v_0 = request.getMetadata();
    var $v_1 = (request)[parameterName];
    if (!parameterName.indexOf('@odata.')) {
        return '\"' + $v_1 + '\"';
    }
    var $v_2 = $v_0.parameterTypes[parameterName];
    if (Mscrm.InternalUtilities.JSTypes.isNull($v_2)) {
        return null;
    }
    switch ($v_2.structuralProperty) {
    case 1:
        if (Mscrm.InternalUtilities.JSTypes.isNull($v_1)) {
            return null;
        }
        return XrmClientApi.WebApi.Serialization.ODataSerializer.serializePrimitiveTypeValue($v_2.typeName, $v_1);
    case 5:
        return XrmClientApi.WebApi.Serialization.ODataSerializer.serializeEntityType($v_1, false);
    case 2:
        var $v_3 = $v_1;
        return XrmClientApi.WebApi.Serialization.ODataSerializer.serializeContract($v_3);
    case 3:
        return XrmClientApi.WebApi.Serialization.ODataSerializer.serializeEnumValue($v_1, $v_2);
    case 4:
        if (Mscrm.InternalUtilities.JSTypes.isNull($v_1)) {
            return 'null';
        } else if (!($v_1).length) {
            return '[]';
        } else if ($v_1[0].getMetadata) {
            var $v_4 = $v_1;
            var $v_5 = new Array(0);
            for (var $v_6 = 0; $v_6 < $v_4.length; $v_6++) {
                $v_5.push(XrmClientApi.WebApi.Serialization.ODataSerializer.serializeContract($v_4[$v_6]));
            }
            return '[' + $v_5.join(',') + ']';
        } else if (Array.indexOf(XrmClientApi.WebApi.Constants.oDataPrimitives, $v_2.typeName) !== -1) {
            var $v_7 = $v_1;
            var $v_8 = new Array(0);
            for (var $v_9 = 0; $v_9 < $v_7.length; $v_9++) {
                $v_8.push(XrmClientApi.WebApi.Serialization.ODataSerializer.serializePrimitiveTypeValue($v_2.typeName, $v_7[$v_9]));
            }
            return '[' + $v_8.join(',') + ']';
        } else {
            var $v_A = $v_1;
            var $v_B = new Array(0);
            for (var $v_C = 0; $v_C < $v_A.length; $v_C++) {
                $v_B.push(XrmClientApi.WebApi.Serialization.ODataSerializer.serializeEntityType($v_A[$v_C], false));
            }
            return '[' + $v_B.join(',') + ']';
        }
    }
    return null;
}
XrmClientApi.WebApi.Serialization.ODataSerializer.serializeContract = function(request) {
    if (!request) {
        return 'null';
    }
    var $v_0 = request;
    var $v_1 = new Array(0);
    var $v_2 = XrmClientApi.WebApi.WebApiService.getKeysFromDictionary($v_0);
    for (var $v_3 = 0; $v_3 < $v_2.length; $v_3++) {
        var $v_4 = $v_2[$v_3];
        var $v_5 = $v_0[$v_4];
        if (typeof ($v_5) !== 'function') {
            $v_1.push(String.format('\"{0}\":{1}', $v_4, XrmClientApi.WebApi.Serialization.ODataSerializer.serializeComplexTypeParameter(request, $v_4)));
        }
    }
    return '{' + $v_1.join(',') + '}';
}
XrmClientApi.WebApi.Serialization.ODataSerializer.serializeEnumValueForURL = function(value, parameterType) {
    var $v_0 = XrmClientApi.WebApi.Serialization.ODataSerializer.getEnumValueMetadata(value, parameterType);
    if (Mscrm.InternalUtilities.JSTypes.isNull($v_0)) {
        return '';
    }
    return parameterType.typeName + '\'' + $v_0.name + '\'';
}
XrmClientApi.WebApi.Serialization.ODataSerializer.serializeParameterIntoURLFragment = function(request, parameterName) {
    var $v_0 = request.getMetadata();
    var $v_1 = $v_0.parameterTypes[parameterName];
    if (Mscrm.InternalUtilities.JSTypes.isNull($v_1)) {
        return null;
    }
    var $v_2 = (request)[parameterName];
    switch ($v_1.structuralProperty) {
    case 1:
        if (Mscrm.InternalUtilities.JSTypes.isNull($v_2)) {
            return null;
        }
        return XrmClientApi.WebApi.Serialization.ODataSerializer.serializePrimitiveTypeValueForURL($v_1.typeName, $v_2);
    case 5:
        return XrmClientApi.WebApi.Serialization.ODataSerializer.serializeEntityType($v_2, true);
    case 2:
        var $v_3 = $v_2;
        return XrmClientApi.WebApi.Serialization.ODataSerializer.serializeContract($v_3);
    case 3:
        return XrmClientApi.WebApi.Serialization.ODataSerializer.serializeEnumValueForURL($v_2, $v_1);
    case 4:
        if (Mscrm.InternalUtilities.JSTypes.isNull($v_2)) {
            return 'null';
        } else if (!($v_2).length) {
            return '[]';
        } else if ($v_2[0].getMetadata) {
            var $v_4 = $v_2;
            var $v_5 = new Array(0);
            for (var $v_6 = 0; $v_6 < $v_4.length; $v_6++) {
                $v_5.push(XrmClientApi.WebApi.Serialization.ODataSerializer.serializeContract($v_4[$v_6]));
            }
            return '[' + $v_5.join(',') + ']';
        } else if (Array.indexOf(XrmClientApi.WebApi.Constants.oDataPrimitives, $v_1.typeName) !== -1) {
            var $v_7 = $v_2;
            var $v_8 = new Array(0);
            for (var $v_9 = 0; $v_9 < $v_7.length; $v_9++) {
                $v_8.push(XrmClientApi.WebApi.Serialization.ODataSerializer.serializePrimitiveTypeValueForURL($v_1.typeName, $v_7[$v_9]));
            }
            return '[' + $v_8.join(',') + ']';
        } else {
            var $v_A = $v_2;
            var $v_B = new Array(0);
            for (var $v_C = 0; $v_C < $v_A.length; $v_C++) {
                $v_B.push(XrmClientApi.WebApi.Serialization.ODataSerializer.serializeEntityType($v_A[$v_C], true));
            }
            return '[' + $v_B.join(',') + ']';
        }
    }
    return null;
}
XrmClientApi.WebApi.Serialization.ODataSerializer.serializeIntoURLFragment = function(request) {
    var $v_0 = request.getMetadata();
    var $v_1 = $v_0.boundParameter;
    var $v_2 = new Array(0);
    var $v_3 = new Array(0);
    var $v_4 = Object.keys(request);
    ;var $v_5 = request;
    for (var $v_6 = 0; $v_6 < $v_4.length; $v_6++) {
        var $v_7 = $v_4[$v_6];
        var $v_8 = $v_5[$v_7];
        if ($v_7 !== $v_1 && typeof ($v_8) !== 'function') {
            var $v_9 = XrmClientApi.WebApi.Serialization.ODataSerializer.serializeParameterIntoURLFragment(request, $v_7);
            if (!Mscrm.InternalUtilities.JSTypes.isNull($v_0.parameterTypes[$v_7]) && $v_0.parameterTypes[$v_7] === 3) {
                $v_3.push(String.format('{0}={1}', $v_7, $v_9));
            } else {
                $v_2.push(String.format('@{0}={1}', $v_7, $v_9));
                $v_3.push(String.format('{0}=@{1}', $v_7, $v_7));
            }
        }
    }
    if ($v_2.length > 0) {
        return String.format('({0})?{1}', $v_3.join(','), $v_2.join('&'));
    } else {
        return String.format('({0})', $v_3.join(','));
    }
}
XrmClientApi.WebApi.Serialization.ODataSerializer.buildRetrieveRequestURLParameter = function(entityRef, columns) {
    var $v_0 = entityRef.entityType;
    var $v_1 = XrmClientApi.WebApi.WebApiParser.getCollectionName($v_0);
    var $v_2 = null;
    var $v_3 = null;
    var $v_4 = new Array(0);
    var $v_5 = new Array(0);
    for (var $v_7 = 0; $v_7 < columns.length; $v_7++) {
        var $v_8 = columns[$v_7];
        var $v_9 = XrmClientApi.WebApi.Util.getAttributeDescriptor($v_0, $v_8);
        if (!$v_9) {
            $v_2 = String.format('Cannot serialize a request with no attribute metadata for {0}.{1}', $v_0, $v_8);
            break;
        }
        if ($v_9['AttributeType'] === 'partylist') {
            var $v_A = XrmClientApi.WebApi.Util.getOneToManyRelationships($v_0);
            for (var $v_B = 0; $v_B < $v_A.length; $v_B++) {
                var $v_C = $v_A[$v_B];
                if ($v_C && $v_C['ReferencedEntity'] === $v_0 && $v_C['ReferencingEntity'] === 'activityparty') {
                    $v_3 = $v_C;
                    break;
                }
            }
            if (!$v_3) {
                $v_2 = String.format('The relationship for the partylist attribute {0} is not found in the cache', $v_8);
                break;
            } else {
                var $v_D = XrmClientApi.WebApi.Util.getParticipationTypeMask($v_0, $v_8);
                if ($v_D === 12) {
                    $v_2 = String.format('Unknown participation type mask for attribute {0}', $v_8);
                    break;
                } else {
                    $v_5.push($v_D);
                }
            }
        } else if (Array.indexOf(XrmClientApi.WebApi.Constants.supportedLookupProperties, $v_9['AttributeType']) !== -1) {
            $v_4.push(String.format('_{0}_value', $v_8));
        } else {
            $v_4.push($v_8);
        }
    }
    if ($v_2) {
        return null;
    }
    var $v_6 = '';
    if ($v_5.length > 0) {
        var $v_E = new Array(0);
        for (var $v_G = 0; $v_G < $v_5.length; $v_G++) {
            $v_E.push(String.format('\'{0}\'', $v_5[$v_G]));
        }
        var $v_F = String.format('$filter=Microsoft.Dynamics.CRM.In(PropertyName=\'participationtypemask\',PropertyValues=[{0}])', $v_E.join(','));
        $v_6 = String.format('&$expand={0}({1})', $v_3['ReferencedEntityNavigationPropertyName'], $v_F);
    }
    return String.format(XrmClientApi.WebApi.Constants.retrieveRequestURLParameterFormat, $v_1, entityRef.id, columns.join(','), $v_6);
}

XrmClientApi.WebApi.Serialization.SerializedRequest = function() {}
XrmClientApi.WebApi.Serialization.SerializedRequest.prototype = {
    urlParameters: null,
    additionalHeaders: null,
    method: null,
    endpoint: null,
    body: null,
    serializationFailure: null
}

Type.registerNamespace('XrmClientApi.Constants');

XrmClientApi.Constants.AttributeTypeCode = function() {}
XrmClientApi.Constants.AttributeTypeCode.prototype = {
    boolean: 0,
    customer: 1,
    dateTime: 2,
    decimal: 3,
    double: 4,
    integer: 5,
    lookup: 6,
    memo: 7,
    money: 8,
    owner: 9,
    partyList: 10,
    picklist: 11,
    state: 12,
    status: 13,
    string: 14,
    uniqueidentifier: 15,
    calendarRules: 16,
    virtual: 17,
    bigInt: 18,
    managedProperty: 19,
    entityName: 20,
    image: 23
}
XrmClientApi.Constants.AttributeTypeCode.registerEnum('XrmClientApi.Constants.AttributeTypeCode', false);

XrmClientApi.Constants.AttributeType = function() {}

Type.registerNamespace('Xrm.Interfaces');

Xrm.Interfaces.IXrmDataSetColumn = function() {}
Xrm.Interfaces.IXrmDataSetColumn.registerInterface('Xrm.Interfaces.IXrmDataSetColumn');

Xrm.Interfaces.IXrmDataSetRecord = function() {}
Xrm.Interfaces.IXrmDataSetRecord.registerInterface('Xrm.Interfaces.IXrmDataSetRecord');

Xrm.Interfaces.IXrmGridControl = function() {}
Xrm.Interfaces.IXrmGridControl.registerInterface('Xrm.Interfaces.IXrmGridControl');

Xrm.Interfaces.IXrmSubGridControl = function() {}
Xrm.Interfaces.IXrmSubGridControl.registerInterface('Xrm.Interfaces.IXrmSubGridControl');

Xrm.Interfaces.IServiceDirectory = function() {}
Xrm.Interfaces.IServiceDirectory.registerInterface('Xrm.Interfaces.IServiceDirectory');

Xrm.Interfaces.IXrmTrace = function() {}
Xrm.Interfaces.IXrmTrace.registerInterface('Xrm.Interfaces.IXrmTrace');

Xrm.Interfaces.IXrmTraceListener = function() {}
Xrm.Interfaces.IXrmTraceListener.registerInterface('Xrm.Interfaces.IXrmTraceListener');

Xrm.Interfaces.IKnowledgeArticle = function() {}
Xrm.Interfaces.IKnowledgeArticle.registerInterface('Xrm.Interfaces.IKnowledgeArticle');

Type.registerNamespace('Xrm.Interfaces.Services');

Xrm.Interfaces.Services.IMostRecentlyViewedService = function() {}
Xrm.Interfaces.Services.IMostRecentlyViewedService.registerInterface('Xrm.Interfaces.Services.IMostRecentlyViewedService');

Type.registerNamespace('Xrm.Objects');

Xrm.Objects.RecentlyViewedItem = function() {}
Xrm.Objects.RecentlyViewedItem.prototype = {
    objectId: null,
    displayName: null,
    title: null,
    iconPath: null,
    action: null,
    pinStatus: false,
    type: 0,
    entityTypeCode: 0,
    lastAccessed: null,

    clone: function() {
        var $v_0 = new Xrm.Objects.RecentlyViewedItem();
        $v_0.objectId = this.objectId;
        $v_0.displayName = this.displayName;
        $v_0.title = this.title;
        $v_0.iconPath = this.iconPath;
        $v_0.action = this.action;
        $v_0.pinStatus = this.pinStatus;
        $v_0.type = this.type;
        $v_0.entityTypeCode = this.entityTypeCode;
        $v_0.lastAccessed = this.lastAccessed;
        return $v_0;
    }
}

Type.registerNamespace('Xrm.Tracing');

Xrm.Tracing.XrmTraceHelper = function() {}
Xrm.Tracing.XrmTraceHelper.traceLog = function(component, format) {
    var args = [];
    for (var $$pai_4 = 2; $$pai_4 < arguments.length; ++$$pai_4) {
        args[$$pai_4 - 2] = arguments[$$pai_4];
    }
    var $$t_3;
    ($$t_3 = Xrm.Internal.trace).log.apply($$t_3, [Object.getType(component).getName(), format].concat(args));
}
Xrm.Tracing.XrmTraceHelper.traceWarning = function(component, format) {
    var args = [];
    for (var $$pai_4 = 2; $$pai_4 < arguments.length; ++$$pai_4) {
        args[$$pai_4 - 2] = arguments[$$pai_4];
    }
    var $$t_3;
    ($$t_3 = Xrm.Internal.trace).warning.apply($$t_3, [Object.getType(component).getName(), format].concat(args));
}
Xrm.Tracing.XrmTraceHelper.traceError = function(component, format) {
    var args = [];
    for (var $$pai_4 = 2; $$pai_4 < arguments.length; ++$$pai_4) {
        args[$$pai_4 - 2] = arguments[$$pai_4];
    }
    var $$t_3;
    ($$t_3 = Xrm.Internal.trace).error.apply($$t_3, [Object.getType(component).getName(), format].concat(args));
}

XrmClientApi.WebApi.Constants.applicatioN_JSON = 'application/json';
XrmClientApi.WebApi.Constants.xhttP_METHOD = 'X-HTTP-Method';
XrmClientApi.WebApi.Constants.maX_PAGE_SIZE = 'odata.maxpagesize={0}';
XrmClientApi.WebApi.Constants.PREFER = 'prefer';
XrmClientApi.WebApi.Constants.returN_NOTIFICATIONS = 'MSCRM.ReturnNotifications';
XrmClientApi.WebApi.Constants.requesT_HEADER_SEPERATOR = ',';
XrmClientApi.WebApi.Constants.odatA_END_POINT = '/api/data/v9.0/';
XrmClientApi.WebApi.Constants.responsE_TYPE = 'application/json';
XrmClientApi.WebApi.Constants.contenT_TYPE = 'application/json; charset=utf-8';
XrmClientApi.WebApi.Constants.batcH_PREFIX = 'batch_';
XrmClientApi.WebApi.Constants.changeseT_PREFIX = 'changeset_';
XrmClientApi.WebApi.Constants.changeseT_REQUEST_BODY = '{0} /{1}/api/data/v9.0/{2} HTTP/1.1';
XrmClientApi.WebApi.Constants.changeseT_REQUEST_BODY_ONLINE = '{0} /api/data/v9.0/{1} HTTP/1.1';
XrmClientApi.WebApi.Constants.geT_REQUEST_BODY = 'GET /{0}/api/data/v9.0/{1} HTTP/1.1';
XrmClientApi.WebApi.Constants.geT_REQUEST_BODY_ONLINE = 'GET /api/data/v9.0/{0} HTTP/1.1';
XrmClientApi.WebApi.Constants.sidE_EFFECT_REQUEST_BODY = '{0} {1}/api/data/v9.0/{2} HTTP/1.1';
XrmClientApi.WebApi.Constants.sidE_EFFECT_REQUEST_BODY_ONLINE = '{0} /api/data/v9.0/{1} HTTP/1.1';
XrmClientApi.WebApi.Constants.requesT_SEPERATOR = '--';
XrmClientApi.WebApi.Constants.partY_LIST = 'partylist';
XrmClientApi.WebApi.Constants.attributes = 'Attributes';
XrmClientApi.WebApi.Constants.oneToManyRelationships = 'OneToManyRelationships';
XrmClientApi.WebApi.Constants.manyToOneRelationships = 'ManyToOneRelationships';
XrmClientApi.WebApi.Constants.manyToManyRelationships = 'ManyToManyRelationships';
XrmClientApi.WebApi.Constants.entityMetadata = 'EntityMetadata';
XrmClientApi.WebApi.Constants.retrieveURLFormatForLookup = '_{0}_value';
XrmClientApi.WebApi.Constants.jsonStartsWith = '{\"error\":';
XrmClientApi.WebApi.Constants.responseWithBatch = '--batchresponse';
XrmClientApi.WebApi.Constants.supportedLookupProperties = ['owner', 'customer', 'lookup'];
XrmClientApi.WebApi.Constants.oDataBaseUrlFormat1 = '{0}/Microsoft.Dynamics.CRM.{1}';
XrmClientApi.WebApi.Constants.oDataBaseUrlFormat2 = '{0}({1})/Microsoft.Dynamics.CRM.{2}';
XrmClientApi.WebApi.Constants.oDataBaseUrlFormat3 = '{0}';
XrmClientApi.WebApi.Constants.retrieveRequestURLParameterFormat = '{0}({1})?$select={2}{3}';
XrmClientApi.WebApi.Constants.associateRequestURLParameterFormat = '{0}({1})/{2}/$ref';
XrmClientApi.WebApi.Constants.disassociateUrlParameterFormat = '{0}({1})/{2}{3}/$ref';
XrmClientApi.WebApi.Constants.oDataPrimitives = ['Edm.Boolean', 'Edm.String', 'Edm.Byte', 'Edm.Decimal', 'Edm.Double', 'Edm.Int16', 'Edm.Int32', 'Edm.Int64', 'Edm.SByte', 'Edm.Single', 'Edm.Date', 'Edm.Guid', 'Edm.DateTimeOffset', 'Edm.Duration', 'Edm.Stream', 'Edm.Binary', 'Edm.TimeOfDay', 'Edm.Geography', 'Edm.GeographyPoint', 'Edm.GeographyLineString', 'Edm.GeographyPolygon', 'Edm.GeographyMultiPoint', 'Edm.GeographyMultiLineString', 'Edm.GeographyMultiPolygon', 'Edm.GeographyCollection', 'Edm.Geometry', 'Edm.GeometryPoint', 'Edm.GeometryLineString', 'Edm.GeometryPolygon', 'Edm.GeometryMultiPoint', 'Edm.GeometryMultiLineString', 'Edm.GeometryMultiPolygon', 'Edm.GeometryCollection'];
XrmClientApi.WebApi.Constants.successCodes = [200, 201, 202, 203, 204, 205, 206, 207, 208, 226];
XrmClientApi.WebApi.EntityMetadataCache.$E = null;
XrmClientApi.Constants.AttributeType.bool = 'Boolean';
XrmClientApi.Constants.AttributeType.customer = 'Customer';
XrmClientApi.Constants.AttributeType.dateTime = 'DateTime';
XrmClientApi.Constants.AttributeType.decimal = 'Decimal';
XrmClientApi.Constants.AttributeType.doubleType = 'Double';
XrmClientApi.Constants.AttributeType.integer = 'Integer';
XrmClientApi.Constants.AttributeType.lookup = 'Lookup';
XrmClientApi.Constants.AttributeType.memo = 'Memo';
XrmClientApi.Constants.AttributeType.money = 'Money';
XrmClientApi.Constants.AttributeType.owner = 'Owner';
XrmClientApi.Constants.AttributeType.partyList = 'PartyList';
XrmClientApi.Constants.AttributeType.picklist = 'Picklist';
XrmClientApi.Constants.AttributeType.state = 'State';
XrmClientApi.Constants.AttributeType.status = 'Status';
XrmClientApi.Constants.AttributeType.string = 'String';
XrmClientApi.Constants.AttributeType.uniqueidentifier = 'Uniqueidentifier';
XrmClientApi.Constants.AttributeType.calendarRules = 'CalendarRules';
XrmClientApi.Constants.AttributeType.virtual = 'Virtual';
XrmClientApi.Constants.AttributeType.bigInt = 'BigInt';
XrmClientApi.Constants.AttributeType.managedProperty = 'ManagedProperty';
XrmClientApi.Constants.AttributeType.entityName = 'EntityName';
XrmClientApi.Constants.AttributeType.image = 'Image';
