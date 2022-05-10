angular
    .module('ushahidi.common', [
        'ushahidi.common.adaptive-input',
        'ushahidi.common.dropdown',
        'ushahidi.common.modal',
        'ushahidi.common.custom-on-change',
        'ushahidi.user-profile',
        'ushahidi.donation'
    ])

    //From posts module
    .service('PostSurveyService', require('./services/post-survey.service.js'))
    .service('PostLockService', require('./services/post-lock.service.js'))
    .service('PostFilters', require('./services/post-filters.service.js'))
    .service('CollectionsService', require('./services/collections.service.js'))

    // Notifications
    .service('Notify', require('./notifications/notify.service.js'))
    .service('SliderService', require('./notifications/slider.service.js'))
    .directive('ushSlider', require('./notifications/slider.directive.js'))

    // API Endpoint wrappers
    .service('DataImportEndpoint', require('./services/endpoints/data-import.js'))
    .service('ConfigEndpoint', require('./services/endpoints/config.js'))
    .service('UserEndpoint', require('./services/endpoints/user-endpoint.js'))
    .service('FormEndpoint', require('./services/endpoints/form.js'))
    .service(
        'FormAttributeEndpoint',
        require('./services/endpoints/form-attributes.js')
    )
    .service(
        'FormStatsEndpoint',
        require('./services/endpoints/form-stats-endpoint.js')
    )
    .service('TagEndpoint', require('./services/endpoints/tag.js'))
    .service('RoleEndpoint', require('./services/endpoints/role.js'))
    .service('MediaEndpoint', require('./services/endpoints/MediaEndpoint.js'))
    .service('PostEndpoint', require('./services/endpoints/post-endpoint.js'))
    .service(
        'PostLockEndpoint',
        require('./services/endpoints/post-lock-endpoint.js')
    )
    .service(
        'CollectionEndpoint',
        require('./services/endpoints/collection.js')
    )
    .service(
        'SavedSearchEndpoint',
        require('./services/endpoints/savedsearch.js')
    )
    .service('ContactEndpoint', require('./services/endpoints/contact.js'))
    .service(
        'NotificationEndpoint',
        require('./services/endpoints/notification.js')
    )
    .service(
        'ExportJobEndpoint',
        require('./services/endpoints/export-jobs.js')
    )
    .service(
        'HxlTagEndpoint',
        require('./services/endpoints/hxl-tag-endpoint.js')
    )

    //UshahidiSDK-wrappers
    .service('SurveysSdk', require('./services/endpoints/sdk/SurveysSdk.js'))
    .service(
        'CategoriesSdk',
        require('./services/endpoints/sdk/CategoriesSdk.js')
    )
    .service('UtilsSdk', require('./services/endpoints/sdk/UtilsSdk.js'))
    .service('PostsSdk', require('./services/endpoints/sdk/PostsSdk.js'))

    // Other services
    .service('Features', require('./services/features.js'))
    .service('Util', require('./services/util.js'))
    .service('Maps', require('./services/maps.js'))
    .service('Geocoding', require('./services/geocoding.js'))
    .service('Languages', require('./services/languages.js'))
    .service('MainsheetService', require('./services/mainsheet.service.js'))
    .service('ModalService', require('./services/modal.service.js'))
    .service('TranslationService', require('./services/translation.service.js'))
    .controller('navigation', require('./controllers/navigation.js'))
    .controller('intercom', require('./controllers/intercom.js'))
    .service(
        'LoadingProgress',
        require('./services/loadingProgress.service.js')
    )
    .service('DataExport', require('./services/data-export.service.js'))
    .service('DataImport', require('./services/data-import.service.js'))
    .service('ImportNotify', require('./services/import.notify.service.js'))
    .service('VerifierService', require('./verifier/verifier.service.js'))
    // Global directives
    .directive('listingToolbar', require('./directives/list-toolbar.js'))
    .directive('firstTimeConfig', require('./directives/first-time-config.js'))
    .directive(
        'ushMainsheetContainer',
        require('./directives/mainsheet-container.directive.js')
    )
    .directive(
        'ushModalContainer',
        require('./directives/modal-container.directive.js')
    )
    .directive('modalBody', require('./directives/modal-body.directive.js'))
    .directive('layoutClass', require('./directives/layout-class.directive.js'))
    .directive('embedOnly', require('./directives/embed-only.directive.js'))
    .directive('focus', require('./directives/focus.js'))
    .directive('fileUpload', require('./directives/file-upload.directive.js'))
    .directive(
        'roleSelector',
        require('./directives/role-selector.directive.js')
    )
    .directive(
        'languageSwitch',
        require('./directives/language-switch.directive.js')
    )
    .directive(
        'loadingDotsButton',
        require('./directives/loading-dots-button.directive.js')
    )
    .directive('addLanguage', require('./directives/add-language.directive.js'))
    .directive(
        'translationsSwitch',
        require('./directives/translations-switch.directive.js')
    )
    // Event actions
    .constant('EVENT', {
        ACTIONS: {
            EDIT: 'edit',
            DELETE: 'delete'
        }
    })
    .factory('loading', require('./factories/loading.interceptor-factory.js'))
    .config(require('./configs/loading.interceptor-config.js'))
    .config(require('./configs/locale-config.js'))
    .run(require('./configs/ui-bootstrap-template-decorators.js'))
    .config(require('./configs/cache-config.js'))

    .config(require('./common-routes.js'))

    .run(require('./global/event-handlers.js'))
    // Use language settings from config
    .run(require('./global/language-settings.js'))

    .factory('Verifier', function () {
        return require('./verifier/verifier.js');
    });

// Load submodules
require('./directives/adaptive-input.js');
require('./directives/dropdown.js');
require('./directives/modal.js');
require('./directives/custom-on-change.js');
require('./user-profile/user-profile-module.js');
require('./donation/donation-module.js');
