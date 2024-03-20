export type Flow = {
  _id: string;
  template: {
    actions: {
      actionUuid: string;
      id: string;
      dependencies: Record<string, any>;
    }[];
    id: string;
    description: string;
  };
  state: {
    global: Record<string, any>;
    actionLog: Record<string, { name: string; metadata: Record<string, any> }>;
  };
  description: string;
  createdAt: string;
};
