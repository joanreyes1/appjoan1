const debug = require('debug')('srv:catalog-service');

module.exports = cds.service.impl(async function () {


    const {
        Sales
    } = this.entities;

    this.after('READ', Sales, (each) => {
        if (each.discoduro > 500) {
            each.criticality = 3;
            if (each.fuente === null)
                each.fuente = '';
            else
                each.fuente += ' ';
            each.fuente += 'Exceptional!';
            debug(each.fuente, { "procesador": each.procesador, "discoduro": each.discoduro });
        } else if (each.discoduro < 150) {
            each.criticality = 1;
        } else {
            each.criticality = 2;
        }
    });

    this.on('boost', async req => {
        try {
            const ID = req.params[0];
            const tx = cds.tx(req);
            await tx.update(Sales)
                .with({ discoduro: { '+=': 250 }, fuente: 'Boosted!' })
                .where({ ID: { '=': ID } })
                ;
            debug('Boosted ID:', ID);
            return {};
        } catch (err) {
            console.error(err);
            return {};
        }
    });


    this.on('topSales', async (req) => {
        try {
            const tx = cds.tx(req);
            const results = await tx.run(`CALL "APPJOAN1_DB_SP_TopSales"(?,?)`, [req.data.discoduro]);
            return results;
        } catch (err) {
            console.error(err);
            return {};
        }
    });












    this.on('userInfo', req => {
        let results = {};
        results.user = req.user.id;
        if (req.user.hasOwnProperty('locale')) {
            results.locale = req.user.locale;
        }
        results.scopes = {};
        results.scopes.identified = req.user.is('identified-user');
        results.scopes.authenticated = req.user.is('authenticated-user');
        results.scopes.Viewer = req.user.is('Viewer');
        results.scopes.Admin = req.user.is('Admin');
        results.tenant = req.user.tenant;
        results.scopes.ExtendCDS = req.user.is('ExtendCDS');
        results.scopes.ExtendCDSdelete = req.user.is('ExtendCDSdelete');
        return results;
    });

});