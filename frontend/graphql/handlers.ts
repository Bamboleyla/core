import { notification } from "antd";

/**Обработчик ошибок GraphQL запросов, будет часто использоваться, не хочется постоянно дублировать код
 *
 * @param error ошибка запроса
 * @param message заголовок сообщения
 */
export const errorHandler = (error: any, message: string) => {
  const errorMessage = error.message;
  //Парсим ошибку
  const errorObject = JSON.parse(
    errorMessage.substring(errorMessage.indexOf(":") + 1)
  );
  //Сообщаем о ошибке пользователю
  notification.error({
    message,
    description: errorObject.response.errors[0].message,
  });
};
