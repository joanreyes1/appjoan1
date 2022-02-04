context appjoan1.db {

    entity Sales {
        key ID          : Integer;
            mainboard   : String(100);
            procesador  : String(100);
            memoriaram  : String(4);
            discoduro   : Integer;
            fuente      : String(100);
            criticality : Integer;
    };


}

@cds.persistence.exists
@cds.persistence.calcview
entity CV_SALES {
    key REGION : String(100);
        AMOUNT : Integer;
}

@cds.persistence.exists
@cds.persistence.calcview
entity CV_SESSION_INFO {
    key ITEM  : String(5000);
        VALUE : String(5000);
}
