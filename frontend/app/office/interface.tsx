"use client";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Tooltip } from "antd";
import { useRouter, usePathname } from "next/navigation";

interface Props {
  page: "clients" | "suppliers" | "products" | "services";
}

export const Interface = ({ page }: Props) => {
  const config = {
    create: "",
    path: {
      create: "create",
    },
  };

  const router = useRouter();
  const pathName = usePathname();

  switch (page) {
    case "clients":
      config.create = "Создать нового клиента";
      break;
    case "services":
      config.create = "Создать новую услугу";
  }

  return (
    <Flex gap="small" wrap="wrap" className="p-2">
      <Tooltip title={`${config.create}`}>
        <Button
          icon={
            <PlusOutlined
              style={{ color: "white" }}
              onClick={() => router.push(pathName + "/create")}
            />
          }
        />
      </Tooltip>
    </Flex>
  );
};
