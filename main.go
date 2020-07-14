package main

import (
	"context"
	"fmt"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

func handler(_ context.Context, ev events.SQSEvent) error {
	for _, msg := range ev.Records {
		fmt.Printf("The message %s for event source %s = %s", msg.MessageId, msg.EventSource, msg.Body)
	}

	return nil
}

func main() {
	lambda.Start(handler)
}