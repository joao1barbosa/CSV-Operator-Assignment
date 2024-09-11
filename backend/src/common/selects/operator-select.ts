import { clientSelect } from './client-select';

export const operatorSelect = {
  id: true,
  name: true,
};

export const operatorWithClientsSelect = {
  ...operatorSelect,
  clients: {
    select: {
      ...clientSelect,
      operatorId: false,
    },
  },
};
