const {
    sql,
    pool_server_business
} = require("./sql_connection.js");

function qInfo (name) { 
    return `select top 1
name,
run_date,
run_time,
run_duration
From msdb.dbo.sysjobs j 
INNER JOIN msdb.dbo.sysjobhistory h 
ON j.job_id = h.job_id 
where name = '${name}'
order by name, run_date, run_time desc`
}
async function runJob(name) {
    const connection = await pool_server_business
    const request = new sql.Request(connection)
        .input("job_name", sql.VarChar, name) //terzo parametro da sostituire con name
    request.execute("msdb.dbo.sp_start_job", (err, result) => {
        if (err) console.log(err)
        else return 1
    })
}
async function jobInfo(name) {
    const connection = await pool_server_business
    const request = new sql.Request(connection)
    let data = await request.query(qInfo(name));
    result = data.recordset
    return result
}

module.exports = {
    runJob, jobInfo
}