using CatalogService as catalog from '../../../srv/catalog-service';

annotate catalog.Sales with @(
    UI: {
        Identification: [ {Value: procesador} ],
        SelectionFields: [ ],
        LineItem: [
            {Value: ID},
            {Value: mainboard},
            {Value: procesador},
            {Value: discoduro, Criticality: criticality},
            {$Type: 'UI.DataFieldForAction', Label: '{i18n>boost}', Action: 'CatalogService.boost', Inline: true},
            {Value: fuente}
        ],
        HeaderInfo: {
            TypeName: '{i18n>procesador}',
            TypeNamePlural: '{i18n>countries}',
            Title: {Value: procesador},
            Description: {Value: ID}
        }
    }
);

annotate catalog.Sales with {
    ID       @title:'{i18n>ID}' @UI.HiddenFilter;
    mainboard   @title:'{i18n>mainboard}';
    procesador  @title:'{i18n>procesador}';
    discoduro   @title:'{i18n>discoduro}';
    fuente @title:'{i18n>fuente}';
};




