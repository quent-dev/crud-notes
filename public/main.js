const update = document.querySelector('#update-button')

update.addEventListener('click', _ => {
    fetch('/notes', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            topic: 'important',
            note: 'keep pushing'
        })
    })
    .then(res => {
        if (res.ok) return res.json()
      })
      .then(response => {
        window.location.reload()
        console.log(response)
      })

})

const deleteNote = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

deleteNote.addEventListener('click', _ => {
    fetch('/notes', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            topic: 'important'
        })
    })
    .then(res => {
        if (res.ok) return res.json()
      })
      .then(response => {
        if (response === 'No note to delete') {
          messageDiv.textContent = 'No note to delete'
        } else {
            window.location.reload()
        }
      })
})


