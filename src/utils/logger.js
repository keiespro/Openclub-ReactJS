/**
 * Simple tools used for logging
 */

const buildPrefix = (prefix, options) => {
  if(prefix){
    return `[${prefix}]`
  }
  return ''
}

const createLog = (prefix, options = {}) => {

  const prefixStr = buildPrefix(prefix, options)

  const logger = () => {
    const args = Array.prototype.slice.call(arguments)
    args.unshift(prefixStr)
    console.log.apply(console, args)
  }

  logger.error = () => {
    const args = Array.prototype.slice.call(arguments)
    args.unshift(prefixStr)
    console.error.apply(console, args)
  }

  return logger
}

const log = createLog()

export {
  log,
  createLog
}
