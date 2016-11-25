process.env.NODE_ENV = 'test';

var User = require('../lib/models/user')

var chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../server')

chai.use(chaiHttp);
chai.should();

let Dawid = {
    'login': 'ddyrcz',
    'password': 'dd'
}

let Kamil = {
    'login': 'kkowalski',
    'password': 'kk'
}

describe("Cupboards", () => {

    before((done) => {
        User.remove({}, () => {
            done()
        });
    })

    it('Creates a new user named Dawid and logins into account', (done) => {
        chai.request(server)
            .post('/signin')
            .send(Dawid)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('valid').eql(true);
                chai.request(server)
                    .post('/login')
                    .send(Dawid)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.have.property('valid').eql(true);
                        res.body.should.have.property('token');
                        res.body.token.should.be.a('string');
                        Dawid.token = res.body.token;
                        done();
                    })
            })
    })

    it('Dawid opens a cupboard with a code Q1', (done) => {
        chai.request(server)
            .patch('/api/cupboards/Q1/open')
            .send({ 'token': Dawid.token })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('valid').eql(true);
                done();
            })
    })

    it('Creates a new user named Kamil, logins and try to open already occupied cupboard by Dawid', (done) => {
        chai.request(server)
            .post('/signin')
            .send(Kamil)
            .end((err, res) => {
                res.should.have.status(200);
                chai.request(server)
                    .post('/login')
                    .send(Kamil)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.have.property('valid').eql(true);
                        res.body.should.have.property('token');
                        res.body.token.should.be.a('string');
                        Kamil.token = res.body.token;

                        chai.request(server)
                            .patch('/api/cupboards/Q1/open')
                            .send({ 'token': Kamil.token })
                            .end((err, res) => {
                                res.should.have.status(423);
                                res.body.should.have.property('valid').eql(false);
                                done();
                            })
                    })
            })
    })

    it('Dawid releases the cupboard with a code Q1', (done) => {
        chai.request(server)
            .patch('/api/cupboards/Q1/release')
            .send({ token: Dawid.token })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('valid').eql(true);
                done();
            });
    })

    it('Kamil tries to open the free cupboard with a code Q1', (done) => {
        chai.request(server)
            .patch('/api/cupboards/Q1/open')
            .send({ token: Kamil.token })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('valid').eql(true);
                done();
            });
    })

})