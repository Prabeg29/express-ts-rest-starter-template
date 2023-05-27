import { Label, LabelDto, LabelDtoCollection } from '@modules/labels/label.type';

export default class LabelMapper {
  public static toDto(label: Label): LabelDto {
    if (label.id && label.name) {
      return {
        id        : label.id,
        attributes: {
          name: label.name,
        }
      };
    }

    return;
  }

  public static toDtoCollection(labels: Label[]): LabelDtoCollection {
    return labels.map(label => LabelMapper.toDto(label));
  }
}
