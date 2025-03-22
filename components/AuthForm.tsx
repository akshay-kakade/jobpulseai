"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import FormField from "./FormField"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/firebase/client"
import { signIn, signUp } from "@/lib/actions/auth.action"


const authFormSchema = (type: FormType) => {
  return z.object({
      name: type === "sign-up" ? z.string().min(3):z.string().optional(),
      email: z.string().email(),
      password: z.string().min(6),
  })
}

const AuthForm = ({ type }: { type: FormType}) => {
 const router = useRouter()
    const formSchema = authFormSchema(type)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

 async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    try {
        if (type === "sign-up"){
          const {name, email, password} = values;
         
          const userCredential = await createUserWithEmailAndPassword(auth, email, password)
          const result =await signUp({
            uid: userCredential.user.uid,
            name: name!,
            email,
            password,
          })

          if(!result?.success){
            toast.error(result?.message)
            return
          }
         toast.success('Account created successfully Please sign in')
         router.push('/sign-in')
        }else{
          const {email, password} = values;

          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const idToken = await userCredential.user.getIdToken()
          if(!idToken){
            toast.error('Failed to sign in')
            return
          } 
            await signIn({email, idToken})
          
          toast.success('Signed in successfully')
          router.push('/')
        }

    } catch (error) {
      console.error(error)
      toast.error(`Something went wrong${error}`)
      
    }
  }

  const isSignIn = type === "sign-in"
  return (
    <div className="cart-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
              <Image 
                 src={"/logo.png"}
                 alt="logo"
                 width={250}
                 height={100}
              />
        </div>
        <h3>Practice job interview with AI</h3>
     
       <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full mt-4 form">
          {!isSignIn && (
            <FormField 
            control={form.control} 
            name="name" 
            label="Name"
            placeholder="Enter your name" 
            />

          )}
          
          <FormField
            control={form.control}
            name="email"
            label="Email"
            placeholder="Enter your email"
            type="email"
            />
          <FormField
            control={form.control}
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
            />
        
        <Button className="btn" type="submit">{isSignIn ? 'Sign In': 'Create an Account'}</Button>
      </form>
    </Form>
    <p className="text-center">
      {isSignIn ? 'Dont have an account?' : 'Already have an account?'}
      <Link href={isSignIn ? '/sign-up' : '/sign-in'}
        className="font-bold text-user-primary ml-1">
          {isSignIn ? 'Sign Up' : 'Sign In'}
          </Link>
    </p>
    </div>
    </div>
  )
}

export default AuthForm

