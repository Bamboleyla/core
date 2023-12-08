import { PlusOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Button, Flex, Tooltip } from "antd";

interface Props {
  page: "clients" | "suppliers" | "products" | "services" | "organizations";
  create: (setCreateModalOpen: boolean) => void; //функция которая открывает модальное окно для создания нового элемента (клиента, сервиса, продукта и.т.д)
  createGroup?: (setCreateGroupModalOpen: boolean) => void; //функция которая открывает модальное окно для создания новой группы (клиента, сервиса, продукта и.т.д), у некоторых страниц может отсутствовать
}

export const Interface = ({ page, create, createGroup }: Props) => {
  const config = {
    create: "",
    path: {
      create: "create",
    },
    createGroup: "",
  };

  switch (page) {
    case "clients":
      config.create = "Создать нового клиента";
      break;
    case "services":
      config.create = "Создать новую услугу";
      config.createGroup = "Создать новую группу услуг";
      break;
    case "organizations":
      config.create = "Создать новую организацию";
  }

  return (
    <Flex gap="small" wrap="wrap" className="p-2">
      <Tooltip title={`${config.create}`}>
        <Button icon={<PlusOutlined onClick={() => create(true)} />} />
      </Tooltip>
      {createGroup && (
        <Tooltip title={`${config.createGroup}`}>
          <Button
            icon={<UnorderedListOutlined onClick={() => createGroup(true)} />}
          />
        </Tooltip>
      )}
    </Flex>
  );
};
