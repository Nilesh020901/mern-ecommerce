const { Card, CardContent } = require("../ui/card");
const { Label } = require("../ui/label");


function AddressCard({ addressInfo }) {
    return (
        <Card>
            <CardContent className="grid gap-4">
                <Label>{addressInfo?.address}</Label>
                <Label>{addressInfo?.city}</Label>
                <Label>{addressInfo?.pincode}</Label>
                <Label>{addressInfo?.phone}</Label>
                <Label>{addressInfo?.notes}</Label>
            </CardContent>
        </Card>
    )
}