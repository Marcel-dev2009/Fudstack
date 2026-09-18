import { Suspense } from "react"
import Settings from "./settings-container"

function SettingsPage() {
  return (
 <Suspense fallback={"Loading..."}>
   <Settings/>
 </Suspense>
  )
}
export default SettingsPage