import { ERROR_MESSAGE } from "../constants/messages/error-messages.const";

export const getExpiration = (time: string): number => {
  const timeUnit = time.slice(-1);
  const timeValue = parseInt(time.slice(0, -1), 10);

  switch (timeUnit) {
    case "s":
      return timeValue;
    case "m":
      return timeValue * 60;
    case "h":
      return timeValue * 60 * 60;
    case "d":
      return timeValue * 60 * 60 * 24;
    default:
      throw new Error(ERROR_MESSAGE.COMMON.INVALID_TIME_FORMAT);
  }
};
