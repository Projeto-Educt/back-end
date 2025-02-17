import { NestRouterAdapter } from '@/main/adapters/nest-adapter';
import type { ControllerContractPresentation } from '@/main/application'; // O caminho para a sua interface de contrato
import { Presenter } from '@/main/application'; // O caminho para o seu presenter
import type { ControllerRequestType } from '@/main/types'; // O caminho para seus tipos
import type { Request, Response } from 'express'; // Importe os tipos do Express

// Mock do Presenter
jest.mock('@/main/application/presenter', () => ({
  Presenter: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    execute: jest.fn((body, accept) => body), // Mock simples: retorna o body sem formatação
  },
}));

describe('NestRouterAdapter', () => {
  let controller: jest.Mocked<ControllerContractPresentation>;
  let adapter: NestRouterAdapter;
  let req: jest.Mocked<Request>;
  let res: jest.Mocked<Response>;

  beforeEach(() => {
    controller = { handle: jest.fn() } as unknown as jest.Mocked<ControllerContractPresentation>;
    adapter = new NestRouterAdapter(controller);
    req = {
      headers: { accept: 'application/json' },
      body: { data: 'test' },
      params: {},
      query: {},
    } as jest.Mocked<Request>;
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    } as unknown as jest.Mocked<Response>;
  });

  it('should call controller.handle with correct request', async () => {
    controller.handle.mockResolvedValueOnce({ body: { message: 'Success' }, statusCode: 200 });
    await adapter.adapt(req, res);

    const expectedRequest: ControllerRequestType = {
      headers: req.headers,
      body: req.body,
      params: req.params,
      query: req.query,
    };

    expect(controller.handle).toHaveBeenCalledWith(expectedRequest);
  });

  it('should call Presenter.execute with correct body and accept header', async () => {
    const mockResponse = { body: { message: 'Success' }, statusCode: 200 };
    controller.handle.mockResolvedValue(mockResponse);

    await adapter.adapt(req, res);

    expect(Presenter.execute).toHaveBeenCalledWith(mockResponse.body, req.headers.accept);
  });

  it('should call res.status and res.send with correct values', async () => {
    const mockResponse = { body: { message: 'Success' }, statusCode: 201 };
    controller.handle.mockResolvedValueOnce(mockResponse);

    await adapter.adapt(req, res);

    expect(res.status).toHaveBeenCalledWith(mockResponse.statusCode);
    expect(res.send).toHaveBeenCalledWith(mockResponse.body);
  });

  it('should handle missing accept header', async () => {
    req.headers.accept = undefined;
    const mockResponse = { body: { message: 'Success' }, statusCode: 200 };
    controller.handle.mockResolvedValue(mockResponse);

    await adapter.adapt(req, res);

    expect(Presenter.execute).toHaveBeenCalledWith(mockResponse.body, undefined);
  });
});
