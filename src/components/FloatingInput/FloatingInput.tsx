export default function FloatingInput(props: React.InputHTMLAttributes<HTMLInputElement>){
    return(
        <div className="floating">
            {props.children}
        </div>
    )
}

