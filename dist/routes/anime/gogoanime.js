"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const extensions_1 = require("@consumet/extensions");
const models_1 = require("@consumet/extensions/dist/models");
const routes = (fastify, options) => __awaiter(void 0, void 0, void 0, function* () {
    const gogoanime = new extensions_1.ANIME.Gogoanime();
    fastify.get('/', (_, rp) => {
        rp.status(200).send({
            intro: "Welcome to the gogoanime provider: check out the provider's website @ https://www1.gogoanime.bid/",
            routes: [
                '/:query',
                '/info/:id',
                '/watch/:episodeId',
                '/servers/:episodeId',
                '/genre/:genre',
                '/genre/list',
                '/top-airing',
                '/movies',
                '/popular',
                '/recent-episodes',
            ],
            documentation: 'https://docs.consumet.org/#tag/gogoanime',
        });
    });
    fastify.get('/:query', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const query = request.params.query;
        const page = request.query.page || 1;
        const res = yield gogoanime.search(query, page);
        reply.status(200).send(res);
    }));
    fastify.get('/info/:id', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const id = decodeURIComponent(request.params.id);
        try {
            const res = yield gogoanime
                .fetchAnimeInfo(id)
                .catch((err) => reply.status(404).send({ message: err }));
            reply.status(200).send(res);
        }
        catch (err) {
            reply
                .status(500)
                .send({ message: 'Something went wrong. Please try again later.' });
        }
    }));
    fastify.get('/genre/:genre', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const genre = request.params.genre;
        const page = request.query.page;
        try {
            const res = yield gogoanime
                .fetchGenreInfo(genre, page)
                .catch((err) => reply.status(404).send({ message: err }));
            reply.status(200).send(res);
        }
        catch (_a) {
            reply
                .status(500)
                .send({ message: 'Something went wrong. Please try again later.' });
        }
    }));
    fastify.get('/genre/list', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const res = yield gogoanime
                .fetchGenreList()
                .catch((err) => reply.status(404).send({ message: err }));
            reply.status(200).send(res);
        }
        catch (_b) {
            reply
                .status(500)
                .send({ message: 'Something went wrong. Please try again later.' });
        }
    }));
    fastify.get('/watch/:episodeId', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const episodeId = request.params.episodeId;
        const server = request.query.server;
        if (server && !Object.values(models_1.StreamingServers).includes(server)) {
            reply.status(400).send('Invalid server');
        }
        try {
            const res = yield gogoanime
                .fetchEpisodeSources(episodeId, server)
                .catch((err) => reply.status(404).send({ message: err }));
            reply.status(200).send(res);
        }
        catch (err) {
            reply
                .status(500)
                .send({ message: 'Something went wrong. Please try again later.' });
        }
    }));
    fastify.get('/servers/:episodeId', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const episodeId = request.params.episodeId;
        try {
            const res = yield gogoanime
                .fetchEpisodeServers(episodeId)
                .catch((err) => reply.status(404).send({ message: err }));
            reply.status(200).send(res);
        }
        catch (err) {
            reply
                .status(500)
                .send({ message: 'Something went wrong. Please try again later.' });
        }
    }));
    fastify.get('/top-airing', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const page = request.query.page;
            const res = yield gogoanime.fetchTopAiring(page);
            reply.status(200).send(res);
        }
        catch (err) {
            reply
                .status(500)
                .send({ message: 'Something went wrong. Contact developers for help.' });
        }
    }));
    fastify.get('/movies', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const page = request.query.page;
            const res = yield gogoanime.fetchRecentMovies(page);
            reply.status(200).send(res);
        }
        catch (err) {
            reply
                .status(500)
                .send({ message: 'Something went wrong. Contact developers for help.' });
        }
    }));
    fastify.get('/popular', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const page = request.query.page;
            const res = yield gogoanime.fetchPopular(page);
            reply.status(200).send(res);
        }
        catch (err) {
            reply
                .status(500)
                .send({ message: 'Something went wrong. Contact developers for help.' });
        }
    }));
    fastify.get('/recent-episodes', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const type = request.query.type;
            const page = request.query.page;
            const res = yield gogoanime.fetchRecentEpisodes(page, type);
            reply.status(200).send(res);
        }
        catch (err) {
            reply
                .status(500)
                .send({ message: 'Something went wrong. Contact developers for help.' });
        }
    }));
});
exports.default = routes;
