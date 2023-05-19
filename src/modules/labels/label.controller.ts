import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

import LabelMapper from '@modules/labels/label.mapper';
import { LabelInput } from '@modules/labels/label.type';
import { HttpException } from '@exceptions/http.exception';
import { LabelRepositoryInterface } from '@modules/labels/repositories/label.repository.interface';

export class LabelController {
  constructor(private readonly _labelRepository: LabelRepositoryInterface) {}

  public index = async (_req: Request, res: Response): Promise<void> => {
    const labels = await this._labelRepository.getAll();

    res.status(StatusCodes.OK).json({ labels: LabelMapper.toDtoCollection(labels)});
  };

  public store = async (req: Request, res: Response): Promise<void> => {
    let label = await this._labelRepository.getOneByName(req.body.name);

    if (label) {
      throw new HttpException(
        `${label.name} as label already exists`,
        StatusCodes.UNPROCESSABLE_ENTITY
      );
    }

    const [labelId] = await this._labelRepository.create(req.body as LabelInput);
    label =  await this._labelRepository.getOne(labelId);

    res.status(StatusCodes.OK).json({ label: LabelMapper.toDto(label)});
  };
}
