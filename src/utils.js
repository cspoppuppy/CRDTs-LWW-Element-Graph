function getNanoSeconds()
  return process.hrtime.bigint()
end

function dateTimeStamp()
  return Date.now().toString() + process.hrtime.bigint().toString()
end