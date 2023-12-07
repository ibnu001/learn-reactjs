import Button from "../Elements/Button"
import InputForm from "../Elements/InputForm"

const FormRegister = () => {
    return (
        <form action="">
          <InputForm
            label="Fulllname"
            type="text"
            placeholder="Chendikia Numawa"
            htmlFor="fullname"
          />

          <InputForm
            label="Email"
            type="email"
            placeholder="example@gmail.com"
            htmlFor="email"
          />

          <InputForm
            label="Password"
            type="password"
            htmlFor="password"
          />

          <Button className="bg-blue-600 w-full ">Register</Button>
        </form>
    )
}

export default FormRegister