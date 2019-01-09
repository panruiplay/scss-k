require('colors')
const process = require('child_process')
const chain = require('func-chain')
const ora = require('ora')
const spinners = require('cli-spinners')
const Table = require('cli-table3')

let all = []

// 测试指定命令
function test(taskName, times = 1000, cb) {
    function runTask() {
        return new Promise((resolve, reject) => {
            process.exec(`gulp ${taskName}`, (error, stdout) => {
                if(error)
                    return reject(error)
                else
                    return resolve(stdout.match(/after\s*(\d+)/)[1])
            })
        })
    }

    let first = runTask(),
        arr = [],
        spinner = ora({ text: `${taskName} 1/${times}`.blue, spinner: spinners.dots12, color: 'red' })

    spinner.start()
    for(let i = 0; i < times; i++) {
        first = first.then((data) => {
            arr.push(data)
            if(i === times - 1) {
                spinner.succeed(taskName.green)

                let sum = arr.reduce((a, b) => +a + +b)
                all.push(
                    [taskName, times, (sum / times >> 0) + 's', sum + 's']
                )
                cb()
            } else {
                spinner.text = `${taskName} ${i + 2}/${times}`.blue
                return runTask()
            }
        })
    }
}


chain()
> test.args('sass', 5)
> test.args('open', 5)
> function() {
    const table = new Table({
        head: ['TaskName', 'Times', 'Average', 'SumTime'],
    })

    table.push(...all)
    console.log(table.toString())
}
|| chain.go()