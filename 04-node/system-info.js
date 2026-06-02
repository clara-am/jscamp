import os from 'node:os'
import ms from 'ms'

console.log('Current Time:', new Date())
console.log('Time after 1 hour:', new Date(Date.now() + ms('1h')))

console.log('Operating System:', os.platform())
console.log('CPU Architecture:', os.arch())
console.log('Total Memory:', os.totalmem())
console.log('Free Memory:', os.freemem())

