const { chromium } = require('playwright');

(async ()=> {
  require('dotenv').config()
  
  const browser = await chromium.launch( {headless: false} )
  const context = await browser.newContext()
  const page = await context.newPage()
  
  await page.goto('https://www.facebook.com')
  await page.fill('input[name="email"]', process.env.USERNAME)
  await page.fill('input[name="pass"]', process.env.PASSWORD)
  await page.click('button[type="submit"]')
  // await page.fill('input[placeholder="Tìm kiếm trên Facebook"]', "Xe tiện chuyến Nga Sơn")
  await page.waitForNavigation()
  await page.goto('https://mbasic.facebook.com/groups/235046160480620?refid=46&__xts__%5B0%5D=12.Abon2QcHjHIpmsjrM_4_5WAIxarrk5yy3yItwJoN5ArUY8f7KD3IqX3fzl8S_5jwBYKKeamkKDbwv4oe1HhT4hHs0H_SgGknj4doJtr3JKagP6Zx5uedzDxPuH_uR6eZxskKEj6w-lcC-YNVTtvS_3GYJgQFI0qYF_0rR7n199jhZbIQi3Mx-URdWUaZc74eUaubSj3vaJWyGtSsJJvCb4PlUH-PC0E-OocYieFyVv1V8xC3CHry63kUwnS2oFslJliMd4-Pb8V8XBQrx3xzePXXii9dg1BJuxjvl_pLQtwndaZ9qQN6FICU_ZgehRIwU2gTr6y1IwXyIwpG8pe4eZmjEQ9JZ3HHf6R09x2YsnDpkBHrlXje_Y4S3zbT_FVHRl0nyxkTVp279TPfst7OkuXkAvnXNgw0HOoe0Oy70J6h2uO2GU9wf3cHcDad297Hs6ROhhJLc05jwQjw5LX9dNgSeU0tvtkQk3ytzd_qFSLcMUnO7advmWN9sxZXrfT-0X1AVK7EL-RbRK9MGTOu12y8ct7ELJzLLlQrviTklftnZFk1MXGk24yPDnF6s23kxwE')
  await page.waitForTimeout(1000)
  
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
          name: nEl.innerText,
          status: titleEl1.length !== 0 ? titleEl1[i].innerText : titleEl2[i].innerText,
          date: dateEl[i].innerText,
        })
      })
    })
    return status
  })
  // console.log('status', multiProfile.length)
  
  
})()
