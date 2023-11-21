import { RemoteGraphQLDataSource } from '@apollo/gateway';

export class AuhthenticatedDataSource extends RemoteGraphQLDataSource {
  willSendRequest({ request, context }) {
    request.http.headers.set(
      'authorization',
      context?.headers?.authorization || undefined,
    );
    /*request.http.headers.set('userId', context.userId);
        request.http.headers.set('authorization', context.authorization);
        request.http.headers.set('permissions', context.permissions);*/
  }
  didReceiveResponse({ response, request, context }) {
    return response;
  }
}
