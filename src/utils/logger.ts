import pino from 'pino';

const logger = pino({
  transport: {
    target : 'pino-pretty',
    options: {
      colorize     : true,
      translateTime: 'SYS:mmm dd yyyy, h:MM:ss TT',
      ignore       : 'pid,hostname'
    }
  },
});

export default logger;
