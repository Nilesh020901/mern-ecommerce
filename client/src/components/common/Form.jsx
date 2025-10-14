import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

function CommonForm({ formFields, formData, setFormData, onSubmit, buttonText, isBtnDisabled }) {

    function renderInputField(field) {
        let element = null;
        const value = formData[field.name] || '';


        switch (field.componentType) {
            case 'input':
                element = <Input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    id={field.id}
                    value={value}
                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                />;
                break;

            case 'select':
                element = (
                    <Select value={value} onValueChange={(val) => setFormData({ ...formData, [field.name]: val })}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={field.label} />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                field.options && field?.options.length > 0 ?
                                    field.options.map((option) => (<SelectItem key={option.id} value={option.id}>{option.label}</SelectItem>))
                                    : null
                            }
                        </SelectContent>
                    </Select>
                )
                break;

            case 'textarea':
                element = (
                    <Textarea
                        placeholder={field.placeholder}
                        name={field.name}
                        id={field.id}
                        value={value}
                        onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                    />
                );
                break;

            default:
                element = <Input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    id={field.id}
                    value={value}
                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                />;
                break;
        }

        return element;
    }
    return (
        <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-3">
                {
                    formFields.map(field => <div key={field.id} className="grid w-full gap-1.5">
                        <Label htmlFor={field.name} className="mb-1">{field.label}</Label>
                        {
                            renderInputField(field)
                        }
                    </div>)
                }
            </div>
            <Button disabled={isBtnDisabled} type="submit" className="mt-2 w-full">{buttonText || 'Submit'}</Button>
        </form>
    )
}

export default CommonForm;