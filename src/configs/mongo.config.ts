import { ConfigService } from "@nestjs/config";
import { MongooseModuleFactoryOptions } from "@nestjs/mongoose";

export const getMongoConfig = async (configService: ConfigService): Promise<MongooseModuleFactoryOptions> => {
    return {
        uri: getMongoUri(configService),
        ...getMongoOptions(configService)
    };
}

const getMongoUri = (configService: ConfigService) =>
    'mongodb://' +
    configService.get('MONGO_LOGIN') +
    ':' +
    configService.get('MONGO_PASSWORD') +
    '@' +
    configService.get('MONGO_HOST') +
    ':' +
    configService.get('MONGO_PORT')

const getMongoOptions = (configService: ConfigService): Partial<MongooseModuleFactoryOptions> => {
    return { dbName: configService.get('MONGO_DB') }
}