const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);
const expect = chai.expect;

describe('the server module', function() {

    it('responds to get request to /', (done) => {
        chai.request(server)
        .get('/')
        .end((err, res) => {
            expect(err).not.exist;
            expect(res).to.have.status(200);
            done();
        });
    });

    it('responds with html', (done) => {
        chai.request(server)
        .get('/')
        .end((err, res) => {
            expect(err).not.exist;
            expect(res).to.be.html;
            done();
        });
    });

    it('responds to get request to /portfolio', (done) => {
        chai.request(server)
        .get('/portfolio')
        .end((err, res) => {
            expect(err).not.exist;
            expect(res).to.have.status(200);
            done();
        });
    });

    it('portfolio responds with html', (done) => {
        chai.request(server)
        .get('/portfolio')
        .end((err, res) => {
            expect(err).not.exist;
            expect(res).to.be.html;
            done();
        });
    });

    it('responds to get request to /contact', (done) => {
        chai.request(server)
        .get('/contact')
        .end((err, res) => {
            expect(err).not.exist;
            expect(res).to.have.status(200);
            done();
        });
    });

    it('contact responds with html', (done) => {
        chai.request(server)
        .get('/contact')
        .end((err, res) => {
            expect(err).not.exist;
            expect(res).to.be.html;
            done();
        });
    });

    it('responds to post request to /thanks', (done) => {
        chai.request(server)
        .post('/thanks')
        .end((err, res) => {
            expect(err).not.exist;
            expect(res).to.have.status(200);
            done();
        });
    });

    it('thanks responds with html', (done) => {
        chai.request(server)
        .post('/thanks')
        .end((err, res) => {
            expect(err).not.exist;
            expect(res).to.be.html;
            done();
        });
    });

});
