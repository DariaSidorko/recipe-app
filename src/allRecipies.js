


export default function allRecipies (list) {
  console.log(list)

  return (
    <div>
      {
        list ? list.list.map((each) => {
        return (
          <div> {each.recipe.label}</div>
        )
        }) : <div> </div>
      }
    </div>
  )

}