const puppeteer = require('puppeteer');
const moment = require('moment')

const dayAgo = 24 * 60 * 60 * 1000
const hourAgo = 60 * 60 * 1000
const minuteAgo = 60 * 1000

const crawler = async () => {
    require('dotenv').config()

    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto('https://www.facebook.com', { waitUntil: "load"})
    await page.$eval('input[name="email"]', (el) => el.value = '0364576377')
    await page.$eval('input[name="pass"]', (el, value) => el.value = value, process.env.PASSWORD)
    await page.click('button[type="submit"]')
    await page.waitForNavigation()
    await page.goto('https://mbasic.facebook.com/groups/235046160480620?refid=46&__xts__%5B0%5D=12.Abon2QcHjHIpmsjrM_4_5WAIxarrk5yy3yItwJoN5ArUY8f7KD3IqX3fzl8S_5jwBYKKeamkKDbwv4oe1HhT4hHs0H_SgGknj4doJtr3JKagP6Zx5uedzDxPuH_uR6eZxskKEj6w-lcC-YNVTtvS_3GYJgQFI0qYF_0rR7n199jhZbIQi3Mx-URdWUaZc74eUaubSj3vaJWyGtSsJJvCb4PlUH-PC0E-OocYieFyVv1V8xC3CHry63kUwnS2oFslJliMd4-Pb8V8XBQrx3xzePXXii9dg1BJuxjvl_pLQtwndaZ9qQN6FICU_ZgehRIwU2gTr6y1IwXyIwpG8pe4eZmjEQ9JZ3HHf6R09x2YsnDpkBHrlXje_Y4S3zbT_FVHRl0nyxkTVp279TPfst7OkuXkAvnXNgw0HOoe0Oy70J6h2uO2GU9wf3cHcDad297Hs6ROhhJLc05jwQjw5LX9dNgSeU0tvtkQk3ytzd_qFSLcMUnO7advmWN9sxZXrfT-0X1AVK7EL-RbRK9MGTOu12y8ct7ELJzLLlQrviTklftnZFk1MXGk24yPDnF6s23kxwE', {waitUntil: "load"})

    const status = await page.evaluate(()=> {
        let status = []
        const statusEl = document.querySelectorAll("article.da.dc.dm")
        statusEl.forEach((el) => {
            const nameEl = el.querySelectorAll("h3.bs.dq.dr strong:first-child a")
            const titleEl1 = el.querySelectorAll("div.ds span:last-child p")
            const titleEl2 = el.querySelectorAll("div.ds span:last-child")
            const dateEl = el.querySelectorAll("footer.ea abbr")

            nameEl.forEach(async (nEl, i) => {
                status.push({
                    id: Math.random().toString(36).substr(2, 9),
                    name: nEl.innerHTML,
                    status: titleEl1.length !== 0 ? titleEl1[i].innerText : titleEl2[i].innerText,
                    date: formatTime(dateEl[i].innerText),
                })
            })
        })
        return status
    })

    await browser.close()
    return status
}

function formatTime(timeString) {
    const time = timeString.split(' ', 2)
    const timeUnit = time[1]
    const timeNumber = time[0]
    return moment(new Date(Date.now() - timeNumber * (timeUnit === 'giờ' ? hourAgo : minuteAgo))).format()
}


module.exports = { crawler }
