import { PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Tooltip } from "antd";

interface Props {
  page: "clients" | "suppliers" | "products" | "services" | "organizations";
  create: (isModalOpen: boolean) => void;
}

export const Interface = ({ page, create }: Props) => {
  const config = {
    create: "",
    path: {
      create: "create",
    },
  };

  switch (page) {
    case "clients":
      config.create = "Создать нового клиента";
      break;
    case "services":
      config.create = "Создать новую услугу";
      break;
    case "organizations":
      config.create = "Создать новую организацию";
  }

  return (
    <Flex gap="small" wrap="wrap" className="p-2">
      <Tooltip title={`${config.create}`}>
        <Button
          icon={
            <PlusOutlined
              style={{ color: "white" }}
              onClick={() => create(true)}
            />
          }
        />
      </Tooltip>
    </Flex>
  );
};
