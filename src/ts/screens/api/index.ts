/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as yup from 'yup';
import {useRequest} from '../../net/useRequest';

type Res = {
  code: number;
  data: {
    list: {
      name: string;
      content: string;
    }[];
  };
};

const resSchema = yup
  .object({
    code: yup.number().required(),
    data: yup
      .object({
        list: yup
          .array()
          .of(
            yup
              .object({
                name: yup.string().default(''),
                content: yup.string().default(''),
              })
              .noUnknown(),
          )
          .default([]),
      })
      .noUnknown(),
  })
  .noUnknown();

type Params = {
  type: 'sport' | 'politics';
};

const useNews = (params: Params) => {
  return useRequest<Res, Params>(
    'https://mock.apifox.cn/m1/1480578-0-default/news',
    'GET',
    {...params},
    resSchema,
  );
};

export {useNews};
