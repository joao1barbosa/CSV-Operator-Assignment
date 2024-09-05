export const operatorSelect = {
  id: true,
  name: true,
};

export const operatorWithClientsSelect = {
  ...operatorSelect,
  clients: true,
};
