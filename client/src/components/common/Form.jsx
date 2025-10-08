import { Select, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { SelectContent } from "@radix-ui/react-select";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

function CommonForm({ formFields, formData, setFormData, onSubmit, buttonText }) {

    function renderInputField(field) {
        let element = null;
        const value = formData[field.name] || '';


        switch (field.type) {
            case 'input':
                element = <Input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    id={field.id}
                    value={value}
                />;
                break;

            case 'select':
                element = (
                    <Select value={value} onValueChange={(val) => setFormData({ ...formData, [field.name]: val })}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={field.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                field.options && field?.options.length > 0 ?
                                    field.options.map(option => <SelectItem key={option.id} value={option.id}>{option.label}</SelectItem>)
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
                        <label htmlFor={field.name} className="mb-1">{field.label}</label>
                        {
                            renderInputField(field)
                        }
                    </div>)
                }
            </div>
            <Button type="submit" className="mt-2 w-full">{buttonText || 'Submit'}</Button>
        </form>
    )
}

export default CommonForm;