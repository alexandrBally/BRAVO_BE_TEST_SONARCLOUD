const serverPrefix = 'server';
const validationPrefix = 'validation';
const authPrefix = 'auth';

/**
 * Errors contains of `group`.`subgroup`.`error`
 */
export default {
  server: {
    internal: `${serverPrefix}.internal.unexpected`,
    notFound: `${serverPrefix}.data.notFound`,
    validation: `${serverPrefix}.validation.failed`,
    bodyParsing: `${serverPrefix}.validation.bodyParsing`,
  },
  auth: {
    invalidToken: `${authPrefix}.token.invalid`,
    expiredToken: `${authPrefix}.token.expired`,
    wrongPassword: `${authPrefix}.signIn.wrongPassword`,
    accessDenied: `${authPrefix}.user.access`,
    registered: `${authPrefix}.user.registered`,
    domainExists: `${authPrefix}.domain.exists`,
  },
  validation: {
    fallback: `${validationPrefix}.failed.fallback`,
    unexpectedField: `${validationPrefix}.unknown.unexpected`,
    invalidEmail: `${validationPrefix}.email.invalid`,
    requiredEmail: `${validationPrefix}.email.required`,
    invalidPassword: `${validationPrefix}.password.invalid`,
    requiredPassword: `${validationPrefix}.password.required`,
    invalidMessageType: `${validationPrefix}.type.invalid`,
    invalidPhone: `${validationPrefix}.phone.invalid`,
    requiredPhone: `${validationPrefix}.phone.required`,
    requiredDeviceId: `${validationPrefix}.deviceId.required`,

    requestTitleTooShort: `${validationPrefix}.requestTitle.tooShort`,
    requiredTitleRequired: `${validationPrefix}.requestTitle.required`,
    requestDateFromRequired: `${validationPrefix}.requestDateFrom.required`,
    requestDateFromShouldBeEmpty: `${validationPrefix}.requestDateFrom.shouldBeEmpty`,
    requestDateToTooLow: `${validationPrefix}.requestDateTo.tooLow`,
    requestDateToRequired: `${validationPrefix}.requestDateTo.required`,
    requestIsUnpaidShouldBeFalse: `${validationPrefix}.requestIsUnpaid.shouldBeFalse`,
    requestIsUnpaidRequired: `${validationPrefix}.requestIsUnpaid.required`,
    requestWillCompensateHoursShouldBeFalse: `${validationPrefix}.requestWillCompensateHours.shouldBeFalse`,
    requestWillCompensateHoursRequired: `${validationPrefix}.requestWillCompensateHours.required`,
    requestStatusRequired: `${validationPrefix}.requestStatus.required`,
    requestStatusInvalid: `${validationPrefix}.requestStatus.invalid`,
    requestRejectReasonRequired: `${validationPrefix}.requestRejectReason.required`,
    requestRejectReasonTooShort: `${validationPrefix}.requestRejectReason.tooShort`,
    requestRejectReasonShouldBeNull: `${validationPrefix}.requestRejectReason.shouldBeNull`,

    extraUserIdRequired: `${validationPrefix}.extraUserId.required`,
    extraDescriptionTooShort: `${validationPrefix}.extraDescription.tooShort`,
    extraDescriptionRequired: `${validationPrefix}.extraDescription.required`,
    extraDurationMinutesRequired: `${validationPrefix}.durationMinutes.required`,
    extraStartDateRequired: `${validationPrefix}.extraStartDate.required`,
    extraEndDateTooLow: `${validationPrefix}.extraEndDate.tooLow`,
    extraEndDateRequired: `${validationPrefix}.extraEndDate.required`,
    extraIsPaidRequired: `${validationPrefix}.extraIsPaid.required`,

    inventoryItemSerialNumberDuplication: `${validationPrefix}.inventoryItemSerialNumber.duplication`,
    inventoryItemTitleRequired: `${validationPrefix}.inventoryItemTitle.required`,
    inventoryItemIsAtHomeRequired: `${validationPrefix}.inventoryItemIsAtHome.required`,
    inventoryItemOwnerRequired: `${validationPrefix}.inventoryItemOwner.required`,
    inventoryTagTitleDuplication: `${validationPrefix}.inventoryTagTitle.duplication`,
    inventoryTagTitleRequired: `${validationPrefix}.inventoryTagTitle.required`,

    companyDomainIncorrect: `${validationPrefix}.companyDomain.incorrect`,
    companyDomainTooLong: `${validationPrefix}.companyDomain.tooLong`,
    companyDomainRequired: `${validationPrefix}.companyDomain.required`,
    companyWorkspaceNameIncorrect: `${validationPrefix}.companyWorkspaceName.incorrect`,
    companyWorkspaceNameTooLong: `${validationPrefix}.companyWorkspaceName.tooLong`,
    companyWorkspaceNameRequired: `${validationPrefix}.companyWorkspaceName.required`,
  },
} as const;
